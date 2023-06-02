import { Level } from './level';
import { LogService } from './log.service';
import { LoggingEvent } from './logging-event';

const JSON_INDENT_IN_SPACES: number = 2;

export class Logger {
  /** Instantiates a new `Logger`
   *
   * `Logger` instances should **NOT** be instantiated directly using the constructor as the instance
   * will not be registered and cached within the `LogService`.  (This will mean that every instance
   * of the parent class will end up with its duplicate copy, rather than sharing a single instance.)
   * Instead, use the method provided on `LogService`, i.e.
   * ```
   *    this._log = logService.getLogger('MyComponent');
   * ```
   */
  constructor(public readonly name: string,
              private readonly _logService: LogService) {
    /* Ideally, this constructor would be marked 'internal', if there was such an access modifier
      in Typescript.
    */
  }

  /**
   * Logs the message and/or error if the condition is `true`.
   *
   * The log entry is recorded as `Level.error`.
   */
  public assert(condition: boolean | undefined, message: string): void;
  public assert(condition: boolean | undefined, error: Error): void;
  public assert(condition: boolean | undefined, message: string, error: Error): void;
  public assert(condition: boolean | undefined, message: string, data: object): void;
  public assert(condition: boolean | undefined, messageOrError: string | Error, errorOrData?: Error | object): void {
    if (condition !== true) {
      this.dispatchLoggingEvent(Level.error, messageOrError, errorOrData);
    }
  }

  public debug(message: string): void;
  public debug(error: Error): void;
  public debug(message: string, error: Error): void;
  public debug(message: string, data: object): void;
  public debug(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.debug, messageOrError, errorOrData);
  }

  public info(message: string): void;
  public info(error: Error): void;
  public info(message: string, error: Error): void;
  public info(message: string, data: object): void;
  public info(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.info, messageOrError, errorOrData);
  }

  public warn(message: string): void;
  public warn(error: Error): void;
  public warn(message: string, error: Error): void;
  public warn(message: string, data: object): void;
  public warn(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.warn, messageOrError, errorOrData);
  }

  public error(message: string): void;
  public error(error: Error): void;
  public error(message: string, error: Error): void;
  public error(message: string, data: object): void;
  public error(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.error, messageOrError, errorOrData);
  }

  public fatal(message: string): void;
  public fatal(error: Error): void;
  public fatal(message: string, error: Error): void;
  public fatal(message: string, data: object): void;
  public fatal(messageOrError: string | Error, errorOrData?: Error | object): void {
    this.dispatchLoggingEvent(Level.fatal, messageOrError, errorOrData);
  }

  public log(levelName: string, message: string): void;
  public log(levelName: string, error: Error): void;
  public log(levelName: string, message: string, error: Error): void;
  public log(levelName: string, message: string, data: object): void;
  public log(levelName: string, messageOrError: string | Error, errorOrData?: Error | object): void {
    const level: Level | undefined = Level.getLevel(levelName);
    if (level) {
      this.dispatchLoggingEvent(level, messageOrError, errorOrData);
    }
  }

  private dispatchLoggingEvent(level: Level, messageOrError: string | Error, errorOrData?: Error | object): void {
    let message: string;
    let error: Error | undefined;

    if (messageOrError instanceof Error) {
      message = '';      /* Use empty string, otherwise 'null' or 'undefined' will be output */
      error = messageOrError;
    } else {
      message = messageOrError;

      if (errorOrData instanceof Error) {
        error = errorOrData;
      } else {
        if (errorOrData !== undefined) {
          message += '\n' + JSON.stringify(errorOrData, null, JSON_INDENT_IN_SPACES);
        }

        error = undefined;
      }
    }

    const loggingEvent: LoggingEvent = new LoggingEvent(level,
                                                        this.name,
                                                        message,
                                                        error
                                                       );
    this._logService.dispatch(loggingEvent);
  }
}
