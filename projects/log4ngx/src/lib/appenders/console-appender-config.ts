import { AppenderConfig } from './appender-config';

// eslint-disable-next-line @typescript-eslint/no-empty-interface -- need an appender type-specific config, even if it doesn't add anything
export interface ConsoleAppenderConfig extends AppenderConfig {
}
