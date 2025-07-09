/** Interface defining the configuration for each {@link Logger} instance. */
export interface LoggerConfig {
  /**
   * The name of the {@link Logger} instance for which this configuration refers. If left blank,
   * this configuration will be used for all {@link Logger} instances that don't have a defined
   * configuration.
   */
  loggerName: string;
  /** The name of the lowest level to be logged. */
  level: string;
  /** The name of each {@link Appender} that log entries will be sent to. */
  appenderNames: string[];
}
