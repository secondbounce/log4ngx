import { Level } from './level';
import { LogService } from './log.service';
import { LoggingEvent } from './logging-event';

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
  public assert(condition: boolean | undefined, exception: Error): void;
  public assert(condition: boolean | undefined, message: string, exception: Error): void;
  public assert(condition: boolean | undefined, messageOrException: string | Error, exception?: Error): void {
    if (condition !== true) {
      this.dispatchLoggingEvent(Level.error, messageOrException, exception);
    }
  }

  public debug(message: string): void;
  public debug(exception: Error): void;
  public debug(message: string, exception: Error): void;
  public debug(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.debug, messageOrException, exception);
  }

  public info(message: string): void;
  public info(exception: Error): void;
  public info(message: string, exception: Error): void;
  public info(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.info, messageOrException, exception);
  }

  public warn(message: string): void;
  public warn(exception: Error): void;
  public warn(message: string, exception: Error): void;
  public warn(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.warn, messageOrException, exception);
  }

  public error(message: string): void;
  public error(exception: Error): void;
  public error(message: string, exception: Error): void;
  public error(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.error, messageOrException, exception);
  }

  public fatal(message: string): void;
  public fatal(exception: Error): void;
  public fatal(message: string, exception: Error): void;
  public fatal(messageOrException: string | Error, exception?: Error): void {
    this.dispatchLoggingEvent(Level.fatal, messageOrException, exception);
  }

  public log(levelName: string, message: string): void;
  public log(levelName: string, exception: Error): void;
  public log(levelName: string, message: string, exception: Error): void;
  public log(levelName: string, messageOrException: string | Error, exception?: Error): void {
    const level: Level | undefined = Level.getLevel(levelName);
    if (level) {
      this.dispatchLoggingEvent(level, messageOrException, exception);
    }
  }

  private dispatchLoggingEvent(level: Level, messageOrException: string | Error, exception?: Error): void {
    let message: string;

    if (messageOrException instanceof Error) {
      message = '';      /* Use empty string, otherwise 'null' or 'undefined' will be output */
      exception = messageOrException;
    } else {
      message = messageOrException;
    }

    const loggingEvent: LoggingEvent = new LoggingEvent(level,
                                                        this.name,
                                                        message,
                                                        exception
                                                       );
    this._logService.dispatch(loggingEvent);
  }
}
