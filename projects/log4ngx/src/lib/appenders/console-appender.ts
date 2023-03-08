import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { ConsoleAppenderConfig } from './console-appender-config';
import { ConsoleService } from '../console.service';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';

export const CONSOLE_APPENDER_TOKEN: InjectionToken<Appender> = new InjectionToken<Appender>('ConsoleAppender');

@Injectable()
export class ConsoleAppender extends Appender {
  constructor(private _consoleService: ConsoleService) {
    super();
  }

  public override initialize(config: ConsoleAppenderConfig): void {
    super.initialize(config);
  }

  protected appendEvent(loggingEvent: LoggingEvent): void {
    const message: string = this.renderLoggingEvent(loggingEvent);
    const loggingLevel: number = loggingEvent.level.value;

    switch (true) {
      case loggingLevel >= Level.error.value:
        this._consoleService.error(message);
        break;

      case loggingLevel >= Level.warn.value:
        this._consoleService.warn(message);
        break;

      case loggingLevel >= Level.info.value:
        this._consoleService.info(message);
        break;

      case loggingLevel >= Level.debug.value:
        this._consoleService.debug(message);
        break;

      default:
        /* Shouldn't happen, but just in case... */
        this._consoleService.trace(message);
        break;
    }
  }
}
