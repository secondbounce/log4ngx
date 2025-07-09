import { Injectable, InjectionToken } from '@angular/core';

import { Appender } from './appender';
import { LocalStorageAppenderConfig } from './localstorage-appender-config';
import { LoggingEvent } from '../logging-event';

/** The [InjectionToken](https://angular.dev/api/core/InjectionToken) to be used when referencing the {@link LocalStorageAppender} for DI. */
export const LOCALSTORAGE_APPENDER_TOKEN: InjectionToken<Appender> = new InjectionToken<Appender>('LocalStorageAppender');
// TODO: document that these are exported for testing so shouldn't be used directly
export const DEFAULT_KEY_PREFIX: string = '#';
export const DEFAULT_LOG_ENTRY_DELIMITER: string = '\n===\n';
export const DEFAULT_MAX_DAYS: number = 3;

const FIREFOX_LEGACY_CODE_VALUE_QUOTA_EXCEEDED: number = 1014;
const NONFIREFOX_LEGACY_CODE_VALUE_QUOTA_EXCEEDED: number = 22;
const FIREFOX_LEGACY_NAME_VALUE_QUOTA_EXCEEDED: string = 'NS_ERROR_DOM_QUOTA_REACHED';
const NONFIREFOX_LEGACY_NAME_VALUE_QUOTA_EXCEEDED: string = 'QuotaExceededError';

/**
 * Class providing support for logging to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
 *
 * Log entries for each day are concatenated into a single value, separated by the
 * {@link logEntryDelimiter}, and stored under a key comprising of the {@link keyPrefix} and the
 * numeric timestamp of the date.
 *
 * Note however that the key format may change, so should you need to access the logs programmatically,
 * it is recommended that the {@link currentKey} property is used to identify the current day's logs.
 * To access other days' logs, check for `localStorage` values whose key starts with {@link keyPrefix}.
 *
 * {@link maxDays} controls the maximum number of days for which log entries are retained.  Once this
 * is reached, the oldest day's logs will be deleted.
 */
@Injectable()
export class LocalStorageAppender extends Appender {
  private _localStorage: Storage | undefined;
  private _currentKey: string = '';
  private _currentLogEntries: string = '';
  private _keyPrefix: string = DEFAULT_KEY_PREFIX;
  private _logEntryDelimiter: string = DEFAULT_LOG_ENTRY_DELIMITER;
  private _maxDays: number = DEFAULT_MAX_DAYS;

  /** Gets the current key being used to store log entries. */
  public get currentKey(): string { return this._currentKey }
  /** Gets the prefix used for the keys. */
  public get keyPrefix(): string { return this._keyPrefix }
  /** Gets the delimiter used to separate each individual log entry within each date-specific value. */
  public get logEntryDelimiter(): string { return this._logEntryDelimiter }
  /** Gets the maximum number of days for which log entries will be held. */
  public get maxDays(): number { return this._maxDays }

  public override initialize(config: LocalStorageAppenderConfig): void {
    super.initialize(config);

    this._keyPrefix = config.keyPrefix ?? DEFAULT_KEY_PREFIX;
    this._logEntryDelimiter = config.logEntryDelimiter ?? DEFAULT_LOG_ENTRY_DELIMITER;
    this._maxDays = this.getValidValue(config.maxDays ?? DEFAULT_MAX_DAYS, DEFAULT_MAX_DAYS);

    this._localStorage = this.getLocalStorage();
    if (this._localStorage !== undefined) {
      this.getCurrentLogEntries(this._localStorage, false);    /* Really just to initialize _currentKey and _currentLogEntries */
    } else {
      // eslint-disable-next-line no-console -- there's not much else we can do
      console.error('LOG4NGX: LocalStorage is not available; calls to log via LocalStorageAppender will be ignored');
    }
  }

  protected appendEvent(loggingEvent: LoggingEvent): void {
    if (this._localStorage !== undefined) {
      const localStorage: Storage = this._localStorage;
      const message: string = this.renderLoggingEvent(loggingEvent);
      let currentLogEntries: string = this.getCurrentLogEntries(localStorage, true);

      if (currentLogEntries.length === 0) {
        currentLogEntries = message;
      } else {
        currentLogEntries += (this._logEntryDelimiter + message);
      }
      this._currentLogEntries = currentLogEntries;

      let retry: boolean;

      do {
        retry = false;

        try {
          localStorage.setItem(this._currentKey, currentLogEntries);
        } catch (error) {
          if (this.isQuotaExceededError(error)) {
            /* Remove all but the current day's logs */
            retry = this.removeOldLogKeys(1);
            // eslint-disable-next-line no-console -- nowhere else we can note this
            console.warn(retry ? 'LOG4NGX: LocalStorage quota has been exceeded; old logs removed so will retry logging'
                               // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- it's only a last resort
                               : `LOG4NGX: LocalStorage quota has been exceeded (${error})`);
          } else {
            // eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions -- nowhere else we can note this
            console.warn(`LOG4NGX: Error occurred logging entry to (${error})`);
          }
        }
      } while (retry);
    }
  }

  /** Based on https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability */
  private getLocalStorage(): Storage | undefined {
    let storage: Storage | undefined;

    try {
      const testValue: string = '__storage_test_ignore_';

      storage = window['localStorage'];
      storage.setItem(testValue, testValue);
      storage.removeItem(testValue);
      return storage;
    } catch (error) {
      /* Acknowledge QuotaExceededError only if there's something already stored */
      return storage !== undefined && storage.length > 0 && this.isQuotaExceededError(error)
                ? storage
                : undefined;
    }
  }

  /** Gets the current log entries for today, performing any necessary housekeeping on old entries */
  private getCurrentLogEntries(localStorage: Storage, appending: boolean): string {
    const key: string = this._keyPrefix + new Date().setHours(0, 0, 0, 0)
                                                    .toString();

    if (key !== this._currentKey) {
      /* If we're about to add a new key, so need to make sure we have `maxDays`-1 entries at most */
      this.removeOldLogKeys(appending ? this._maxDays - 1
                                      : this._maxDays);

      /* We'll reset `_currentLogEntries` just in case there are already log entries for today
        from a previous session.
      */
      this._currentKey = key;
      this._currentLogEntries = localStorage.getItem(this._currentKey) ?? '';
    }

    return this._currentLogEntries;
  }

  private removeOldLogKeys(maxKeys: number): boolean {
    let handled: boolean = false;
    const logKeys: string[] = this.getLogKeys(localStorage);

    /* We're about to add a new one, so need to make sure we have `maxDays`-1 entries at most.
      There may be multiple days' entries to be removed if, say, `maxDays` has been reduced
      between sessions.
    */
    while (logKeys.length > maxKeys) {
      const logKey: string = logKeys.shift() ?? '';
      localStorage.removeItem(this._keyPrefix + logKey);
      handled = true;
    }

    if (handled) {
      // eslint-disable-next-line no-console -- nowhere else we can note this
      console.info('LOG4NGX: Log entries purged from LocalStorage');
    }

    return handled;
  }

  /**
   * @returns The existing log-related keys, sorted in date order.
   */
  private getLogKeys(localStorage: Storage): string[] {
    const logKeys: string[] = [];

    for (let i: number = localStorage.length - 1; i >= 0; i--) {
      const existingKey: string | null = localStorage.key(i);
      if (existingKey?.startsWith(this._keyPrefix)) {
        logKeys.push(existingKey.slice(this._keyPrefix.length));
      }
    }

    logKeys.sort((a, b) => Number.parseInt(a) - Number.parseInt(b));

    return logKeys;
  }

  private getValidValue(value: number, defaultValue: number): number {
    return value > 0 ? value
                     : defaultValue;
  }

  private isQuotaExceededError(exception: unknown): boolean {
    return (exception instanceof DOMException
/* eslint-disable @typescript-eslint/no-deprecated -- need to support older browsers, just in case */
         && (exception.code === NONFIREFOX_LEGACY_CODE_VALUE_QUOTA_EXCEEDED
          || exception.code === FIREFOX_LEGACY_CODE_VALUE_QUOTA_EXCEEDED
/* eslint-enable @typescript-eslint/no-deprecated */
          /* Test name field too, because code might not be present */
          || exception.name === NONFIREFOX_LEGACY_NAME_VALUE_QUOTA_EXCEEDED
          || exception.name === FIREFOX_LEGACY_NAME_VALUE_QUOTA_EXCEEDED));
  }
}
