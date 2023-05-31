import { AppenderPlaceholders, CONSOLE_APPENDER_TOKEN } from 'log4ngx';

import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  logging: {
    loggers: [
      {
        loggerName: '',
        level: 'warn',
        appenderNames: [
          'console'
        ]
      }
    ],
    appenders: [
      {
        name: 'console',
        providerToken: CONSOLE_APPENDER_TOKEN,
        logFormat: `${AppenderPlaceholders.Level} ${AppenderPlaceholders.Logger} ${AppenderPlaceholders.Message}${AppenderPlaceholders.Error}`,
        errorFormat: undefined
      }
    ]
  }
};
