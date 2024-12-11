# README

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/secondbounce/log4ngx/badge)](https://scorecard.dev/viewer/?uri=github.com/secondbounce/log4ngx)
![Documentation](docs/coverage.svg)

log4ngx is a Typescript logging framework for Angular projects, based on concepts used in Log4j,
Log4net, etc.

## Concepts

### Loggers

`Loggers` provide access to the methods for logging messages at the required `Level`.  Each class -
i.e. component, module or service - will usually define its own `Logger` which will identify that
class within any messages logged via it.

### LogService

The `LogService` is the factory with which you instantiate `Loggers` in each of the components,
services, etc, in which you wish to log messages.  Behind the scenes, it also orchestrates the
dispatch of messages from the `Loggers` to the appropriate `Appenders`.

### Appenders

`Appenders` are responsible for sending log entries to the underlying target or service.
Configuration will normally depend on the target/service, but all `Appenders` are configured with
the layout format for messages logged to them.

### LogServiceConfig

The `LogService` is configured using an instance of the `LogServiceConfig`, typically created in
your application's main module.  The configuration defines the parameters used with each `Appender`
and how each `Appender` relates to the various `Loggers`.

For more information about using and configuring log4ngx, see <https://secondbounce.github.io/log4ngx/>.
The [demo project](projects/demo/) also contains examples of configuring and using the
library.
