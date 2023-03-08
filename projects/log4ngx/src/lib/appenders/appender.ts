import { AppenderConfig } from './appender-config';
import { LoggingEvent } from '../logging-event';

/** Placeholder constants for use in the `AppenderConfig.logFormat` and/or
 * `AppenderConfig.exceptionFormat` properties.
 */
export /*not const*/ enum AppenderPlaceholders {
  /** The `Level.displayName` property. */
  Level = '{level}',
  /** The `Logger.name` property. */
  Logger = '{logger}',
  /** The log message. */
  Message = '{message}',
  /** The log timestamp as a number. */
  Timestamp = '{timestamp}',
  /** The log timestamp converted to the default date format, e.g. 'Mon Aug 07 2017'. */
  Date = '{date}',
  /** The log timestamp converted to ISO format, e.g. '2017-08-07T14:53:34.329Z'. */
  IsoDate = '{date-iso}',
  /** The log timestamp converted to locale-specific date format, e.g. '07/08/2017'. */
  ShortDate = '{date-short}',
  /** The log timestamp converted to locale-specific date/time format, e.g. '07/08/2017, 15:53:34'. */
  Datetime = '{datetime}',
  /** The log timestamp converted to locale-specific time format, e.g. '15:53:34'. */
  Time = '{time}',
  /** The log timestamp converted to UTC format, e.g. 'Mon, 07 Aug 2017 14:53:34 GMT'. */
  UtcDate = '{date-utc}',
  /** The logged exception (if any), formatted according to `AppenderConfig.exceptionFormat`. */
  Exception = '{exception}',
  /** The logged exception's `name` property.
   *
   * Note that this placeholder is only valid within `AppenderConfig.exceptionFormat`.
  */
  ExceptionName = '{exception-name}',
  /** The logged exception's `message` property.
   *
   * Note that this placeholder is only valid within `AppenderConfig.exceptionFormat`.
  */
  ExceptionMessage = '{exception-message}',
  /** The logged exception's `stack` property.
   *
   * Note that this placeholder is only valid within `AppenderConfig.exceptionFormat`.
  */
  ExceptionStack = '{exception-stack}',
  /** Carriage return/line feed characters, i.e. '\r\n'. */
  Crlf = '{crlf}',
  /** Linefeed character, i.e. '\n'. */
  Lf = '{lf}'
}

export abstract class Appender {
  private _name: string = '';
  private _logFormat: string = '';
  private _exceptionFormat: string = '';

  public initialize(config: AppenderConfig): void {
    this._name = config.name;
    this._logFormat = config.logFormat;
    this._exceptionFormat = config.exceptionFormat || (AppenderPlaceholders.Crlf
                                                     + AppenderPlaceholders.ExceptionName + ': ' + AppenderPlaceholders.ExceptionMessage + AppenderPlaceholders.Crlf
                                                     + AppenderPlaceholders.ExceptionStack);
  }

  public get name(): string {
    return this._name;
  }

  public get logFormat(): string {
    return this._logFormat;
  }

  public get exceptionFormat(): string {
    return this._exceptionFormat;
  }

  public append(loggingEvent: LoggingEvent): void {
    // if (loggingEvent.level.value >= this.threshold.value) {
      // Checks that the IFilter chain accepts the loggingEvent.
      // Calls [M:PreAppendCheck()] and checks that it returns true.
      this.appendEvent(loggingEvent);
    // }
  }

  protected abstract appendEvent(loggingEvent: LoggingEvent): void;

  protected renderLoggingEvent(loggingEvent: LoggingEvent): string {
    let logMessage: string = this._logFormat;
    logMessage = logMessage.split(AppenderPlaceholders.Level).join(loggingEvent.level.displayName);
    logMessage = logMessage.split(AppenderPlaceholders.Logger).join(loggingEvent.loggerName);
    logMessage = logMessage.split(AppenderPlaceholders.Message).join(this.getSafeMessage(loggingEvent.message));
    logMessage = logMessage.split(AppenderPlaceholders.Timestamp).join(loggingEvent.timestamp.toString());

    const date: Date = new Date(loggingEvent.timestamp);
    logMessage = logMessage.split(AppenderPlaceholders.Date).join(date.toDateString());             // Mon Aug 07 2017
    logMessage = logMessage.split(AppenderPlaceholders.IsoDate).join(date.toISOString());           // 2017-08-07T14:53:34.329Z
    logMessage = logMessage.split(AppenderPlaceholders.ShortDate).join(date.toLocaleDateString());  // 07/08/2017
    logMessage = logMessage.split(AppenderPlaceholders.Datetime).join(date.toLocaleString());       // 07/08/2017, 15:53:34
    logMessage = logMessage.split(AppenderPlaceholders.Time).join(date.toLocaleTimeString());       // 15:53:34
    logMessage = logMessage.split(AppenderPlaceholders.UtcDate).join(date.toUTCString());           // Mon, 07 Aug 2017 14:53:34 GMT

    let exceptionMessage: string = '';
    if (loggingEvent.exception) {
      exceptionMessage = this.renderException(loggingEvent.exception);
    }

    logMessage = logMessage.split(AppenderPlaceholders.Exception).join(exceptionMessage);

    logMessage = logMessage.split(AppenderPlaceholders.Crlf).join('\r\n');
    logMessage = logMessage.split(AppenderPlaceholders.Lf).join('\n');

    return logMessage;
  }

  protected renderException(exception: Error): string {
    let logMessage: string = this._exceptionFormat;

    logMessage = logMessage.split(AppenderPlaceholders.ExceptionName).join(exception.name);
    logMessage = logMessage.split(AppenderPlaceholders.ExceptionMessage).join(this.getSafeMessage(exception.message));
    logMessage = logMessage.split(AppenderPlaceholders.ExceptionStack).join(exception.stack);

    logMessage = logMessage.split(AppenderPlaceholders.Crlf).join('\r\n');
    logMessage = logMessage.split(AppenderPlaceholders.Lf).join('\n');

    return logMessage;
  }

  private getSafeMessage(message: string): string {
    if (message === null) {
      message = '<null>';
    } else if (typeof message === 'undefined') {
      message = '<undefined>';
    }

    return message;
  }
}
