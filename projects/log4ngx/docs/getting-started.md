---
title: Getting Started
---
# Getting Started

## Installing

log4ngx is installed via NPM:

``` sh
npm install log4ngx --save
```

## Concepts

### LogService

The `LogService` is the factory with which you instantiate `Loggers` for each of the components, services, etc, in which you wish to log messages.  Behind the scenes, it also orchestrates the dispatch of messages from the `Loggers` to the appropriate `Appenders`.

### Loggers

`Loggers` provide access to the methods for logging messages at the required `Level`.  Each class - i.e. component, module or service - will usually define its own `Logger` which will identify that class within any messages logged via it.

### Appenders

`Appenders` are responsible for sending log entries to the underlying target or service.  Configuration will normally depend on the target/service, but all `Appenders` are configured with the layout format for messages logged to them.  Applications are unlikely to use or reference `Appenders` directly.

### LogServiceConfig

The `LogService` is configured using an instance of the `LogServiceConfig`, typically created in your application's main module.  The configuration defines the parameters used with each `Appender` and how each `Appender` relates to the various `Loggers`.

## Configuration

The configuration is defined using the {@link LogServiceConfig} interface.  This can be done directly within _main.ts_ and passed into the providers.

Alternatively, you can use environment-specific configurations (see [environment-specific configurations](https://angular.dev/tools/cli/environments#using-environment-specific-variables-in-your-app)) which would allow you to log 'debug'-level statements in development, but only 'info'-level and above in production, for example.
