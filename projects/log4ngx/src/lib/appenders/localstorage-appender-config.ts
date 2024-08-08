import { AppenderConfig } from './appender-config';

/** Interface defining the configuration of `LocalStorageAppender` objects.
 * @extends AppenderConfig
 */
export interface LocalStorageAppenderConfig extends AppenderConfig {
  /** Defines the prefix used for the key when adding items to `localStorage`. */
  keyPrefix?: string;
  logEntryDelimiter?: string;
  maxDays?: number;
}
