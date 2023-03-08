/* eslint-disable @typescript-eslint/unbound-method -- see https://typescript-eslint.io/rules/unbound-method/#when-not-to-use-it */
import { TestBed } from '@angular/core/testing';

import { AppenderPlaceholders } from './appender';
import { ConsoleAppender, CONSOLE_APPENDER_TOKEN } from './console-appender';
import { ConsoleAppenderConfig } from './console-appender-config';
import { ConsoleService } from '../console.service';
import { Level, LevelValue } from '../level';
import { LoggingEvent } from '../logging-event';
import { Random } from '../utility';

const APPENDER_CONFIG: ConsoleAppenderConfig = {
  name: 'consoleAppender',
  providerToken: CONSOLE_APPENDER_TOKEN,
  logFormat: AppenderPlaceholders.Message,
  exceptionFormat: undefined
};
const RANDOM_LEVEL_NAME_LENGTH: number = 20;
const RANDOM_MESSAGE_LENGTH: number = 150;

describe('ConsoleAppender', () => {
  let consoleService: ConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsoleService
      ]
    });

    consoleService = TestBed.inject(ConsoleService);
    spyOn(consoleService, 'debug');
    spyOn(consoleService, 'error');
    spyOn(consoleService, 'info');
    spyOn(consoleService, 'log');
    spyOn(consoleService, 'trace');
    spyOn(consoleService, 'warn');
  });

  it('should render debug messages via ConsoleService.debug()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.debug, '', message);
    appender.append(loggingEvent);

    expect(consoleService.debug).toHaveBeenCalledWith(message);
  });

  it('should render error messages via ConsoleService.error()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.error, '', message);
    appender.append(loggingEvent);

    expect(consoleService.error).toHaveBeenCalledWith(message);
  });

  it('should render fatal messages via ConsoleService.error()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.fatal, '', message);
    appender.append(loggingEvent);

    expect(consoleService.error).toHaveBeenCalledWith(message);
  });

  it('should render info messages via ConsoleService.info()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.info, '', message);
    appender.append(loggingEvent);

    expect(consoleService.info).toHaveBeenCalledWith(message);
  });

  it('should render warn messages via ConsoleService.warn()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(Level.warn, '', message);
    appender.append(loggingEvent);

    expect(consoleService.warn).toHaveBeenCalledWith(message);
  });

  it('should render custom level messages via the nearest lower level', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);
    let message: string;
    let loggingEvent: LoggingEvent;

    const aboveWarn: Level = Level.add(LevelValue.Warn + 1,
                                       Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                       'above-warn');
    message = Random.getString(RANDOM_MESSAGE_LENGTH);
    loggingEvent = new LoggingEvent(aboveWarn, '', message);
    appender.append(loggingEvent);
    expect(consoleService.warn).toHaveBeenCalledWith(message);

    const belowWarn: Level = Level.add(LevelValue.Warn - 1,
                                       Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                       'below-warn');
    message = Random.getString(RANDOM_MESSAGE_LENGTH);
    loggingEvent = new LoggingEvent(belowWarn, '', message);
    appender.append(loggingEvent);
    expect(consoleService.info).toHaveBeenCalledWith(message);
  });

  it('should render levels below `debug` via ConsoleService.trace()', () => {
    const appender: ConsoleAppender = new ConsoleAppender(consoleService);
    appender.initialize(APPENDER_CONFIG);

    const level: Level = Level.add(LevelValue.Debug - 1,
                                   Random.getString(RANDOM_LEVEL_NAME_LENGTH),
                                   'below-debug');
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const loggingEvent: LoggingEvent = new LoggingEvent(level, '', message);
    appender.append(loggingEvent);

    expect(consoleService.trace).toHaveBeenCalledWith(message);
  });
});
