/* eslint-disable no-console -- duh! */
import { TestBed } from '@angular/core/testing';

import { AppenderPlaceholders } from './appender';
import { CONSOLE_APPENDER_TOKEN, ConsoleAppender } from './console-appender';
import { ConsoleAppenderConfig } from './console-appender-config';
import { Level, LevelValue } from '../level';
import { LoggingEvent } from '../logging-event';
import { Random } from '../utility';

const APPENDER_CONFIG: ConsoleAppenderConfig = {
  name: 'consoleAppender',
  providerToken: CONSOLE_APPENDER_TOKEN,
  logFormat: AppenderPlaceholders.Message,
  errorFormat: undefined
};
const RANDOM_LEVEL_NAME_LENGTH: number = 20;
const RANDOM_MESSAGE_LENGTH: number = 150;

describe('ConsoleAppender', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});

    spyOn(console, 'debug');
    spyOn(console, 'error');
    spyOn(console, 'info');
    spyOn(console, 'log');
    spyOn(console, 'trace');
    spyOn(console, 'warn');
  });

  it('should render debug messages via console.debug()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);
    appender.append(loggingEvent);

    expect(console.debug).toHaveBeenCalledWith(message);
  });

  it('should render error messages via console.error()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.error, '', message);
    appender.append(loggingEvent);

    expect(console.error).toHaveBeenCalledWith(message);
  });

  it('should render fatal messages via console.error()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.fatal, '', message);
    appender.append(loggingEvent);

    expect(console.error).toHaveBeenCalledWith(message);
  });

  it('should render info messages via console.info()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.info, '', message);
    appender.append(loggingEvent);

    expect(console.info).toHaveBeenCalledWith(message);
  });

  it('should render warn messages via console.warn()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.warn, '', message);
    appender.append(loggingEvent);

    expect(console.warn).toHaveBeenCalledWith(message);
  });

  it('should render custom level messages via the nearest lower level', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);
    let message: string;
    let loggingEvent: LoggingEvent;

    const aboveWarn: Level = Level.add(LevelValue.Warn + 1,
                                       Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                       'above-warn');
    message = Random.getString(RANDOM_MESSAGE_LENGTH);
    loggingEvent = new LoggingEvent(aboveWarn, '', message);
    appender.append(loggingEvent);
    expect(console.warn).toHaveBeenCalledWith(message);

    const belowWarn: Level = Level.add(LevelValue.Warn - 1,
                                       Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                       'below-warn');
    message = Random.getString(RANDOM_MESSAGE_LENGTH);
    loggingEvent = new LoggingEvent(belowWarn, '', message);
    appender.append(loggingEvent);
    expect(console.info).toHaveBeenCalledWith(message);
  });

  it('should render levels below `debug` via console.trace()', () => {
    const appender: ConsoleAppender = new ConsoleAppender();
    appender.initialize(APPENDER_CONFIG);

    const level: Level = Level.add(LevelValue.Debug - 1,
                                   Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                   'below-debug');
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(level, '', message);
    appender.append(loggingEvent);

    expect(console.trace).toHaveBeenCalledWith(message);
  });
});
