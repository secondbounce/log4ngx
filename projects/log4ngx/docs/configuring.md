---
title: Configuration
---
# Configuration

The configuration is defined using the {@link LogServiceConfig} interface.  This can be done directly within _main.ts_ and passed into the providers:

``` typescript
const loggingConfig: LogServiceConfig = {
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
      logFormat: `[${AppenderPlaceholders.Level}] ${AppenderPlaceholders.Logger} ${AppenderPlaceholders.Message}${AppenderPlaceholders.Error}`
    }
  ]
};

const appConfig = {
  providers: [
    ...
    { provide: CONSOLE_APPENDER_TOKEN, useClass: ConsoleAppender },
    { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: loggingConfig }
  ]
};

bootstrapApplication(AppComponent, appConfig)
    .catch(error => console.error(error));
```

## Environment-specific configurations

Alternatively, you can use environment-specific configurations (see [environment-specific configurations](https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app)) which would, for example, allow you to log 'debug'-level statements in development, but only 'info'-level and above in production.

``` typescript
export const environment = {
  production: false,
  logging: {
    loggers: [
      {
        loggerName: '',
        level: 'debug',
        appenderNames: [
          'console'
        ]
      }
    ],
    appenders: [
      {
        name: 'console',
        providerToken: CONSOLE_APPENDER_TOKEN,
        logFormat: `[${AppenderPlaceholders.Level}] ${AppenderPlaceholders.Logger} ${AppenderPlaceholders.Message}${AppenderPlaceholders.Error}`
      }
    ]
  }
};
```

Then you will just reference the appropriate section of your environment from within the application config:

``` typescript
  { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: environment.logging }
```
