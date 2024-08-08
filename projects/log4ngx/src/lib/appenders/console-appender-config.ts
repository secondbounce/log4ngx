import { AppenderConfig } from './appender-config';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- need an appender type-specific config, even if it doesn't add anything
export interface ConsoleAppenderConfig extends AppenderConfig {}
