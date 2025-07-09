import { EnvironmentInjector, Inject, inject, Injectable, runInInjectionContext } from '@angular/core';

import { Appender } from './appenders';
import { Level } from './level';
import { LOG_SERVICE_CONFIG_TOKEN, LogServiceConfig } from './log-service-config';
import { Logger } from './logger';
import { LoggerConfig } from './logger-config';
import { LoggingEvent } from './logging-event';

/**
 *
 *
 * ``` typescript
 * export class MyComponent {
 *   private readonly _log: Logger;
 *
 *   constructor(logService: LogService) {
 *     this._log = logService.getLogger(this);
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {
  private _loggers: Map<string, Logger> = new Map<string, Logger>();
  private _appenders: Map<string, Appender> = new Map<string, Appender>();
  private _loggerConfigs: Map<string, LoggerConfig> = new Map<string, LoggerConfig>();
  private _environmentInjector = inject(EnvironmentInjector);

  // eslint-disable-next-line @angular-eslint/prefer-inject -- injecting via constructor allows config to be passed in for testing
  constructor(@Inject(LOG_SERVICE_CONFIG_TOKEN) config: LogServiceConfig) {
    this.configure(config);
  }

  public configure(config: LogServiceConfig): void {
    this._appenders.clear();
    this._loggerConfigs.clear();

    /* For 'real world' use, a static configuration will be used that is set as the application is
      bootstrapped.  But for the unit tests, we need different configuration, hence this is split
      into its own function.  However, if we call `inject()` outside the constructor, it has to be
      wrapped in a call to `runInInjectionContext()`, otherwise we'll get the dreaded
      "NG0203: `inject()` must be called from an injection context" error.
    */
    runInInjectionContext(this._environmentInjector, () => {
      for (const appenderConfig of config.appenders) {
        const appender: Appender = inject(appenderConfig.providerToken);
        appender.initialize(appenderConfig);

        this._appenders.set(appenderConfig.name, appender);
      }
    });

    for (const loggerConfig of config.loggers) {
      this._loggerConfigs.set(loggerConfig.loggerName, loggerConfig);
    }
  }

  /**
   * IMPORTANT  Passing a string value for `nameOrInstance`, rather than an object is recommended
   * if your build system minifies or otherwise mangles class names and you intend including the
   * class name in your log output.
   *
   * @param nameOrInstance A string value containing the name of the `Logger` or an `object` the
   * name of which will be used.
   * @returns The `Logger` associated with the specified name.
   */
  public getLogger(nameOrInstance: string | object): Logger {
    let name: string;

    if (typeof nameOrInstance === 'object') {
      name = nameOrInstance.constructor.name;
    } else {
      name = nameOrInstance;
    }

    let logger: Logger | undefined = this._loggers.get(name);

    if (!logger) {
      logger = new Logger(name, this);
      this._loggers.set(name, logger);
    }

    return logger;
  }

  public dispatch(loggingEvent: LoggingEvent): void {
    let loggerConfig: LoggerConfig | undefined = this._loggerConfigs.get(loggingEvent.loggerName);
    loggerConfig ??= this._loggerConfigs.get('');

    if (loggerConfig !== undefined) {
      const level: Level | undefined = Level.getLevel(loggerConfig.level);

      /* Need to check if a level was returned just in case the name in the config is wrong */
      if (level && loggingEvent.level.value >= level.value) {
        for (const appenderName of loggerConfig.appenderNames) {
          const appender: Appender | undefined = this._appenders.get(appenderName);
          if (appender) {
            appender.append(loggingEvent);
          }
        }
      }
    }
  }
}
