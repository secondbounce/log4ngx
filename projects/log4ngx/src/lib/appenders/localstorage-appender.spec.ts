import { TestBed } from '@angular/core/testing';

import { AppenderPlaceholders } from './appender';
import { DEFAULT_KEY_PREFIX, DEFAULT_LOG_ENTRY_DELIMITER, DEFAULT_MAX_DAYS, LOCALSTORAGE_APPENDER_TOKEN, LocalStorageAppender } from './localstorage-appender';
import { LocalStorageAppenderConfig } from './localstorage-appender-config';
import { Level } from '../level';
import { LoggingEvent } from '../logging-event';
import { Random } from '../utility';

interface LocalStorageAppenderConfigProperties {
  keyPrefix?: string;
  logEntryDelimiter?: string;
  maxDays?: number;
}

const KEY_PREFIX: string = 'LOG4NGX-TEST#';
const MAX_DAYS: number = 2;
const APPENDER_CONFIG: LocalStorageAppenderConfig = {
  name: 'localStorageAppender',
  providerToken: LOCALSTORAGE_APPENDER_TOKEN,
  logFormat: AppenderPlaceholders.Message,
  errorFormat: undefined,
  keyPrefix: KEY_PREFIX,
  maxDays: MAX_DAYS
};
const RANDOM_MESSAGE_LENGTH: number = 150;
const RANDOM_KEY_LENGTH: number = 10;
const RANDOM_LOG_ENTRY_DELIMITER_LENGTH: number = 5;
const RANDOM_MAX_DAYS_LIMIT: number = 5;
/* HACK ALERT!  There's a presumed limit of 5MB for localstorage, so 10 x 1MB(ish!) log messages
  should be enough to force the quota to be exceeded.  There doesn't appear to be an easy way to
  find the quota value though, so if the related tests start to fail, these constants may need
  updating.
*/
const QUOTA_TESTING_MESSAGE_LENGTH: number = 1_000_000;
const QUOTA_TESTING_MESSAGE_COUNT: number = 10;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- just adding an arbitrary number of days
const DAYS_LOGS_TO_TEST: number = MAX_DAYS + 2;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- kinda obvious
const MILLISECS_PER_DAY: number = 1000 * 60 * 60 * 24;

describe('LocalStorageAppender', () => {
  let localStorage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    localStorage = window['localStorage'];
    localStorage.clear();
  });

  it('should initialize configuration correctly', () => {
    const keyPrefix: string = Random.getString(RANDOM_KEY_LENGTH, true);
    const logEntryDelimiter: string = '\n' + Random.getString(RANDOM_LOG_ENTRY_DELIMITER_LENGTH, true) + '\n';
    const maxDays: number = Random.getInteger(RANDOM_MAX_DAYS_LIMIT, 1);
    const appender: LocalStorageAppender = getConfiguredLocalStorageAppender({ keyPrefix,
                                                                               logEntryDelimiter,
                                                                               maxDays
                                                                             });

    expect(appender.keyPrefix).toBe(keyPrefix);
    expect(appender.logEntryDelimiter).toBe(logEntryDelimiter);
    expect(appender.maxDays).toBe(maxDays);
  });

  it('should use default value for config properties, if omitted', () => {
    const appender: LocalStorageAppender = getConfiguredLocalStorageAppender({});

    expect(appender.keyPrefix).toBe(DEFAULT_KEY_PREFIX);
    expect(appender.logEntryDelimiter).toBe(DEFAULT_LOG_ENTRY_DELIMITER);
    expect(appender.maxDays).toBe(DEFAULT_MAX_DAYS);
  });

  it('should use default value for `maxDays` property if invalid', () => {
    let appender: LocalStorageAppender = getConfiguredLocalStorageAppender({ maxDays: 0 });
    expect(appender.maxDays).toBe(DEFAULT_MAX_DAYS);

    appender = getConfiguredLocalStorageAppender({ maxDays: -1 });
    expect(appender.maxDays).toBe(DEFAULT_MAX_DAYS);
  });

  it('should use the configured `keyPrefix` value in the `currentKey`', () => {
    const keyPrefix: string = Random.getString(RANDOM_KEY_LENGTH, true);
    const appender: LocalStorageAppender = getConfiguredLocalStorageAppender({ keyPrefix });

    expect(appender.currentKey.startsWith(keyPrefix)).toBeTrue();
  });

  it('should log entries using key prefix and today\'s timestamp', () => {
    const appender: LocalStorageAppender = new LocalStorageAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);
    appender.append(loggingEvent);

    const key: string = localStorage.key(0) ?? '';
    const prefix: string = appender.keyPrefix;
    const timestamp: number = Number.parseInt(key.slice(prefix.length));
    const date: Date = new Date(timestamp);
    const today: Date = new Date();

    expect(localStorage.length).toBe(1);
    expect(key.startsWith(prefix)).toBeTrue();
    expect(timestamp).not.toBeNaN();
    expect(date.getFullYear()).toBe(today.getFullYear());
    expect(date.getMonth()).toBe(today.getMonth());
    expect(date.getDate()).toBe(today.getDate());
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('should delimit log entries with configured `logEntryDelimiter` value', () => {
    const appender: LocalStorageAppender = new LocalStorageAppender();
    appender.initialize(APPENDER_CONFIG);

    const message1: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    let loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message1);
    appender.append(loggingEvent);

    const message2: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    loggingEvent = new LoggingEvent(Level.debug, '', message2);
    appender.append(loggingEvent);

    expect(localStorage.length).toBe(1);

    const key: string = localStorage.key(0) ?? '';
    expect(key.startsWith(appender.keyPrefix)).toBeTrue();

    const logEntries: string = localStorage.getItem(key) ?? '';
    expect(logEntries).toBe(message1 + appender.logEntryDelimiter + message2);
  });

  it('should remove log entries when max days is exceeded', () => {
    jasmine.clock().withMock(() => {
      const todayTimestamp: number = Date.now();
      const appender: LocalStorageAppender = new LocalStorageAppender();
      appender.initialize(APPENDER_CONFIG);

      for (let i: number = DAYS_LOGS_TO_TEST - 1; i >= 0; i--) {
        jasmine.clock().mockDate(new Date(todayTimestamp - (i * MILLISECS_PER_DAY)));

        const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
        const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);
        appender.append(loggingEvent);

        expect(localStorage.length).toBe(Math.min(appender.maxDays, DAYS_LOGS_TO_TEST - i));
      }
    });
  });

  it('should remove log entries when storage quota is exceeded', () => {
    jasmine.clock().withMock(() => {
      const todayTimestamp: number = Date.now();
      const maxDays: number = QUOTA_TESTING_MESSAGE_COUNT;  /* Make sure logs aren't cleaned up */
      const appender: LocalStorageAppender = getConfiguredLocalStorageAppender({ maxDays });

      let message: string = '';

      /* Not sure this is absolutely the best way to test this but we'll keep adding messages to
        ensure we exceed the quota (on multiple days so there are previous logs we can purge the
        early ones).  Then when we're done, make sure the latest message still appears in the
        storage, proving that space must have be released.
      */
      for (let i: number = QUOTA_TESTING_MESSAGE_COUNT - 1; i >= 0; i--) {
        jasmine.clock().mockDate(new Date(todayTimestamp - (i * MILLISECS_PER_DAY)));

        message = Random.getString(QUOTA_TESTING_MESSAGE_LENGTH);
        const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);
        appender.append(loggingEvent);
      }

      const latestLogEntries: string = localStorage.getItem(appender.currentKey) ?? '';
      expect(latestLogEntries).toBe(message);
    });
  });

  it('should fail gracefully when storage quota is exceeded and no log entries can be removed', () => {
    const appender: LocalStorageAppender = new LocalStorageAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(QUOTA_TESTING_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);

    for (let i: number = 0; i < QUOTA_TESTING_MESSAGE_COUNT; i++) {
      appender.append(loggingEvent);
    }

    expect(localStorage.length).toBe(1);  /* Just in case */

    const key: string = localStorage.key(0) ?? '';
    const logEntries: string = localStorage.getItem(key) ?? '';
    const entries: string[] = logEntries.split(appender.logEntryDelimiter);

    expect(entries.length).toBeLessThan(QUOTA_TESTING_MESSAGE_COUNT);
  });
});

function getConfiguredLocalStorageAppender(properties: LocalStorageAppenderConfigProperties): LocalStorageAppender {
  const appender: LocalStorageAppender = new LocalStorageAppender();
  const config: LocalStorageAppenderConfig = { ...properties,
                                               name: 'localStorageAppender',
                                               providerToken: LOCALSTORAGE_APPENDER_TOKEN,
                                               logFormat: AppenderPlaceholders.Message,
                                               errorFormat: undefined
                                             };

  appender.initialize(config);
  return appender;
}
