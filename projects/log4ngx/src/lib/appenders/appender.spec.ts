import { TestBed } from '@angular/core/testing';

import { AppenderPlaceholders } from './appender';
import { AppenderConfig } from './appender-config';
import { MOCK_APPENDER_TOKEN, MockAppender } from './mock-appender';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';
import { Random } from '../utility';

const APPENDER_CONFIG: AppenderConfig = {
  name: 'mockAppender',
  providerToken: MOCK_APPENDER_TOKEN,
  logFormat: '',
  errorFormat: undefined
};
const RANDOM_MESSAGE_LENGTH: number = 100;

describe('Base Appender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe('`name` property', () => {
    it('should be stored correctly', () => {
      const name: string = Random.getString(RANDOM_MESSAGE_LENGTH);
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       name
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.name).toBe(name);
    });
  });

  describe('`logFormat` property', () => {
    it('should be stored correctly', () => {
      const logFormat: string = Random.getString(RANDOM_MESSAGE_LENGTH);
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.logFormat).toBe(logFormat);
    });

    it('accepts an empty string', () => {
      const logFormat: string = '';
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.logFormat).toBe(logFormat);
    });
  });

  describe('`errorFormat` property', () => {
    it('should be stored correctly', () => {
      const errorFormat: string = Random.getString(RANDOM_MESSAGE_LENGTH);
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.errorFormat).toBe(errorFormat);
    });

    it('uses default value if undefined', () => {
      const errorFormat: string | undefined = undefined;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);
      expect(appender.errorFormat).toBeDefined();
    });
  });

  describe('`renderLoggingEvent` method', () => {
    it('should render ' + AppenderPlaceholders.Level + ' using `displayName` property', () => {
      const logFormat: string = AppenderPlaceholders.Level;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const levels: Level[] = [
        Level.debug,
        Level.info,
        Level.warn,
        Level.error,
        Level.fatal
      ];

      levels.forEach((level) => {
        level.displayName = `##${level.displayName}##`;
        loggingEvent.level = level;
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(level.displayName);
      });
    });

    it('should render ' + AppenderPlaceholders.Logger + ' using `name` property', () => {
      const logFormat: string = AppenderPlaceholders.Logger;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggerName: string = 'MockAppenderTest-logFormat-logger-' + Date.now().toString();
      const loggingEvent: LoggingEvent = getLoggingEvent(undefined, loggerName);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(loggerName);
    });

    it('should render ' + AppenderPlaceholders.Message, () => {
      const logFormat: string = AppenderPlaceholders.Message;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      let message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
      loggingEvent.message = message;
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(message);

      message = '      ';
      loggingEvent.message = message;
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(message);

      message = '';
      loggingEvent.message = message;
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(message);

      message = undefined;
      loggingEvent.message = message;
      expect(appender.renderLoggingEvent(loggingEvent)).toBe('<undefined>');

      // eslint-disable-next-line unicorn/no-null -- we're specifically testing for null
      message = null;
      loggingEvent.message = message;
      expect(appender.renderLoggingEvent(loggingEvent)).toBe('<null>');
    });

    it('should render ' + AppenderPlaceholders.Timestamp + ' as numeric value', () => {
      const logFormat: string = AppenderPlaceholders.Timestamp;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(loggingEvent.timestamp.toString());
    });

    it('should render ' + AppenderPlaceholders.Date + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.Date;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toDateString());
    });

    it('should render ' + AppenderPlaceholders.IsoDate + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.IsoDate;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                      logFormat
                                    };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toISOString());
    });

    it('should render ' + AppenderPlaceholders.ShortDate + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.ShortDate;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                      logFormat
                                    };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toLocaleDateString());
    });

    it('should render ' + AppenderPlaceholders.Datetime + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.Datetime;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                      logFormat
                                    };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toLocaleString());
    });

    it('should render ' + AppenderPlaceholders.Time + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.Time;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                      logFormat
                                    };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toLocaleTimeString());
    });

    it('should render ' + AppenderPlaceholders.UtcDate + ' in correct format', () => {
      const logFormat: string = AppenderPlaceholders.UtcDate;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                      logFormat
                                    };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      const date: Date = new Date(loggingEvent.timestamp);
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(date.toUTCString());
    });

    it('should render ' + AppenderPlaceholders.ErrorName + ' using the error `name` property', () => {
      const logFormat: string = AppenderPlaceholders.Error;
      const errorFormat: string = AppenderPlaceholders.ErrorName;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      try {
        throw new TypeError(Random.getString(RANDOM_MESSAGE_LENGTH));
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(error.constructor.name);
      }
    });

    it('should render ' + AppenderPlaceholders.ErrorMessage + ' using the error `message` property', () => {
      const logFormat: string = AppenderPlaceholders.Error;
      const errorFormat: string = AppenderPlaceholders.ErrorMessage;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      let errorMessage: string = Random.getString(RANDOM_MESSAGE_LENGTH);
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(errorMessage);
      }

      errorMessage = '      ';
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(errorMessage);
      }

      errorMessage = '';
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(errorMessage);
      }

      errorMessage = undefined;
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe('');   /* Chrome converts 'undefined' messages to an empty string */
      }

      // eslint-disable-next-line unicorn/no-null -- we're specifically testing for null
      errorMessage = null;
      try {
        throw new TypeError(errorMessage);
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe('null');   /* Chrome converts null messages to the string 'null' */
      }
    });

    it('should render ' + AppenderPlaceholders.ErrorStack + ' using the error `stack` property', () => {
      const logFormat: string = AppenderPlaceholders.Error;
      const errorFormat: string = AppenderPlaceholders.ErrorStack;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      try {
        throw new TypeError(Random.getString(RANDOM_MESSAGE_LENGTH));
      } catch (ex) {
        const error: Error = ex as Error;
        const loggingEvent: LoggingEvent = getLoggingEvent(error);

        /* We can't guarantee the exact output in the stacktrace since each combination of browser, browser
          version, Angular, webpack and so on, all conspire to affect the output.  So it's HIGHLY likely that
          any package upgrades, etc, will cause this test to fail. So we'll try to use regexes that minimise
          the chance of failure.
        */
        const pattern: RegExp = globalThis.navigator.userAgent.includes('Edge')
                                  ? new RegExp(/at TestBedViewEngine\.prototype\.execute/)
                                  : new RegExp(/appender\.spec\.(ts|js)/);
        expect(appender.renderLoggingEvent(loggingEvent)).toMatch(pattern);
      }
    });

    it('should ignore error if not specified in logFormat', () => {
      const logFormat: string = AppenderPlaceholders.Message;
      const errorFormat: string = AppenderPlaceholders.ErrorName;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      try {
        throw new TypeError(Random.getString(RANDOM_MESSAGE_LENGTH));
      } catch (ex) {
        const error: Error = ex as Error;
        const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
        const loggingEvent: LoggingEvent = getLoggingEvent(error, message);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(message);
      }
    });

    it('should render literal content and CR/LF in `logFormat`', () => {
      const line1: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const line2: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const line3: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const logFormat: string = AppenderPlaceholders.Lf
                              + line1 + AppenderPlaceholders.Crlf
                              + line2 + AppenderPlaceholders.Lf
                              + line3 + AppenderPlaceholders.Crlf;
      const result: string = '\n' + line1 + '\r\n' + line2 + '\n' + line3 + '\r\n';
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      const loggingEvent: LoggingEvent = getLoggingEvent();
      expect(appender.renderLoggingEvent(loggingEvent)).toBe(result);
    });

    it('should render literal content and CR/LF in `errorFormat`', () => {
      const prefix: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const line1: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const line2: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const line3: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const suffix: string = ' ' + Random.getString(RANDOM_MESSAGE_LENGTH) + ' ';
      const logFormat: string = prefix + AppenderPlaceholders.Error + suffix;
      const errorFormat: string = AppenderPlaceholders.Lf
                                + line1 + AppenderPlaceholders.Crlf
                                + line2 + AppenderPlaceholders.Lf
                                + line3 + AppenderPlaceholders.Crlf;
      const result: string = prefix + '\n' + line1 + '\r\n' + line2 + '\n' + line3 + '\r\n' + suffix;
      const config: AppenderConfig = { ...APPENDER_CONFIG,
                                       logFormat,
                                       errorFormat: errorFormat
                                     };
      const appender: MockAppender = new MockAppender();
      appender.initialize(config);

      try {
        throw new TypeError(Random.getString(RANDOM_MESSAGE_LENGTH));
      } catch (ex) {
        const error: Error = ex as Error;
        const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
        const loggingEvent: LoggingEvent = getLoggingEvent(error, message);
        expect(appender.renderLoggingEvent(loggingEvent)).toBe(result);
      }
    });

    // it('testing getLoggingEvent()...', () => {
    //   expect(getLoggingEvent().message).toBe('-----|-------|------');
    //   expect(getLoggingEvent(new Error()).message).toBe('error|-------|------');

    //   expect(getLoggingEvent(undefined).message).toBe('-----|-------|------');
    //   expect(getLoggingEvent(undefined, '').message).toBe('-----|-------|logger');
    //   expect(getLoggingEvent('').message).toBe('-----|message|------');
    //   expect(getLoggingEvent('', '').message).toBe('-----|message|logger');

    //   expect(getLoggingEvent(new Error(), undefined).message).toBe('error|-------|------');
    //   expect(getLoggingEvent(new Error(), undefined, '').message).toBe('error|-------|logger');
    //   expect(getLoggingEvent(new Error(), '').message).toBe('error|message|------');
    //   expect(getLoggingEvent(new Error(), '', '').message).toBe('error|message|logger');
    // });
  });
});

function getLoggingEvent(message: string | undefined, loggerName?: string): LoggingEvent;
function getLoggingEvent(error?: Error, message?: string, loggerName?: string): LoggingEvent;
function getLoggingEvent(errorOrMessage?: Error | string,
                         messageOrLoggerName?: string,
                         loggerName?: string): LoggingEvent {
  let message: string = '';
  let error: Error | undefined;
  // let altError: string = '-----';
  // let altMessage: string = '-------';
  // let altLogger: string = '------';

  if (errorOrMessage instanceof Error) {
    error = errorOrMessage;
    message = messageOrLoggerName ?? Random.getString(RANDOM_MESSAGE_LENGTH);
    // altError = 'error';
    // altMessage = messageOrLoggerName !== undefined ? 'message' : '-------';
    // altLogger = loggerName !== undefined ? 'logger' : '------';
  } else if (typeof errorOrMessage === 'string') {
    message = errorOrMessage;
    loggerName = messageOrLoggerName;
    // altMessage = 'message';
    // altLogger = messageOrLoggerName !== undefined ? 'logger' : '------';
  } else {
    if (loggerName !== undefined) {
      message = messageOrLoggerName ?? Random.getString(RANDOM_MESSAGE_LENGTH);
      // altMessage = messageOrLoggerName !== undefined ? 'message' : '-------';
      // altLogger = 'logger';
    } else {
      loggerName = messageOrLoggerName;
      // altLogger = messageOrLoggerName !== undefined ? 'logger' : '------';
    }
  }

  loggerName ??= Random.getString(RANDOM_MESSAGE_LENGTH);

  // message = altError + '|' + altMessage + '|' + altLogger;

  return new LoggingEvent(Level.info, loggerName, message, error);
}
