import { AppenderConfig } from './appender-config';

/** Interface defining the configuration of {@link LocalStorageAppender} objects. */
export interface LocalStorageAppenderConfig extends AppenderConfig {
  /** Defines the prefix used for the key when adding items to `localStorage`. */
  keyPrefix?: string;
  /** String value used as a delimiter between each log entry */
  logEntryDelimiter?: string;
  /** Maximum number of days' logs to be retained in `localStorage` */
  maxDays?: number;
}
