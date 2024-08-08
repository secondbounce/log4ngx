# README

log4ngx is a Typescript logging framework for Angular projects, based on concepts used in Log4j, Log4net, etc.

> **Current Status**  
> The library is now complete enough to be used in production if the `ConsoleAppender` and `LocalStorageAppender` are sufficient
for your needs.
> Documentation is being completed in the repository's Github Pages and will be updated as progress is made - as soon as it is in a reasonably complete state, a proper link will be made available here.

## Concepts

### LogService

The `LogService` is the factory with which you instantiate `Loggers` in each of the components, services, etc, in which you wish to log messages.  Behind the scenes, it also orchestrates the dispatch of messages from the `Loggers` to the appropriate `Appenders`.

### LogServiceConfig

The `LogService` is configured using an instance of the `LogServiceConfig`, typically created in your application's main module.  The configuration defines the parameters used with each `Appender` and how each `Appender` relates to the various `Loggers`.

### Loggers

`Loggers` provide access to the methods for logging messages at the required `Level`.  Each class - i.e. component, module or service - will usually define its own `Logger` which will identify that class within any messages logged via it.

### Appenders

`Appenders` are responsible for sending log entries to the underlying target or service.  Configuration will normally depend on the target/service, but all `Appenders` are configured with the layout format for messages logged to them.
