import { inject, TestBed } from '@angular/core/testing';

import { Level } from './level';
import { LogServiceConfig, LOG_SERVICE_CONFIG_TOKEN } from './log-service-config';
import { LogService } from './log.service';
import { Logger } from './logger';
import { LoggingEvent } from './logging-event';
import { MockLogService } from './mock-log.service';
import { Random } from './utility';

const LOG_SERVICE_CONFIG: LogServiceConfig = {
  loggers: [],
  appenders: []
};
const RANDOM_STRING_LENGTH: number = 120;
const TEN_MILLISECONDS: number = 10;

describe('Logger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: LOG_SERVICE_CONFIG },
        { provide: LogService, useClass: MockLogService }
      ]
    });
  });

  describe('`debug` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      testLoggerOverloads(logService, logger, logger.debug.bind(logger), Level.debug);
    }));
  });

  describe('`info` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      testLoggerOverloads(logService, logger, logger.info.bind(logger), Level.info);
    }));
  });

  describe('`warn` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      testLoggerOverloads(logService, logger, logger.warn.bind(logger), Level.warn);
    }));
  });

  describe('`error` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      testLoggerOverloads(logService, logger, logger.error.bind(logger), Level.error);
    }));
  });

  describe('`fatal` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      testLoggerOverloads(logService, logger, logger.fatal.bind(logger), Level.fatal);
    }));
  });

  describe('`log` method', () => {
    it('should interpret overloaded arguments correctly', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);

      /* Can't call testLoggerOverloads() as Logger.log() takes an extra argument */
      let message: string;
      let error: Error;
      let loggingEvent: LoggingEvent | undefined;
      let timestamp: number;

      message = Random.getString(RANDOM_STRING_LENGTH);
      timestamp = Date.now();
      logger.log('info', message);
      loggingEvent = logService.lastLoggingEvent;
      expect(loggingEvent).toBeDefined();
      expect(loggingEvent?.level).toBe(Level.info);
      expect(loggingEvent?.loggerName).toBe(logger.name);
      expect(loggingEvent?.message).toBe(message);
      expect(loggingEvent?.exception).toBeUndefined();
      expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);

      error = new Error(Random.getString(RANDOM_STRING_LENGTH));
      timestamp = Date.now();
      logger.log('info', error);
      loggingEvent = logService.lastLoggingEvent;
      expect(loggingEvent).toBeDefined();
      expect(loggingEvent?.level).toBe(Level.info);
      expect(loggingEvent?.loggerName).toBe(logger.name);
      expect(loggingEvent?.message).toBe('');
      expect(loggingEvent?.exception).toBe(error);
      expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);

      message = Random.getString(RANDOM_STRING_LENGTH);
      error = new Error(Random.getString(RANDOM_STRING_LENGTH));
      timestamp = Date.now();
      logger.log('info', message, error);
      loggingEvent = logService.lastLoggingEvent;
      expect(loggingEvent).toBeDefined();
      expect(loggingEvent?.level).toBe(Level.info);
      expect(loggingEvent?.loggerName).toBe(logger.name);
      expect(loggingEvent?.message).toBe(message);
      expect(loggingEvent?.exception).toBe(error);
      expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);
    }));

    it('should ignore calls with non-existent levels', inject([LogService], (logService: MockLogService) => {
      const logger: Logger = new Logger(Random.getString(RANDOM_STRING_LENGTH), logService);
      const levelName: string = Random.getString(RANDOM_STRING_LENGTH);
      const message: string = Random.getString(RANDOM_STRING_LENGTH);

      logger.log(levelName, message);
      expect(logService.lastLoggingEvent).toBeUndefined();
    }));
  });
});

function testLoggerOverloads(logService: MockLogService,
                             logger: Logger,
                             methodToTest: { (message: string): void;
                                             (exception: Error): void;
                                             (message: string, exception: Error): void;
                                           },
                             level: Level): void {
  let message: string;
  let error: Error;
  let loggingEvent: LoggingEvent | undefined;
  let timestamp: number;

  message = Random.getString(RANDOM_STRING_LENGTH);
  timestamp = Date.now();
  methodToTest(message);
  loggingEvent = logService.lastLoggingEvent;
  expect(loggingEvent).toBeDefined();
  expect(loggingEvent?.level).toBe(level);
  expect(loggingEvent?.loggerName).toBe(logger.name);
  expect(loggingEvent?.message).toBe(message);
  expect(loggingEvent?.exception).toBeUndefined();
  expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);

  error = new Error(Random.getString(RANDOM_STRING_LENGTH));
  timestamp = Date.now();
  methodToTest(error);
  loggingEvent = logService.lastLoggingEvent;
  expect(loggingEvent).toBeDefined();
  expect(loggingEvent?.level).toBe(level);
  expect(loggingEvent?.loggerName).toBe(logger.name);
  expect(loggingEvent?.message).toBe('');
  expect(loggingEvent?.exception).toBe(error);
  expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);

  message = Random.getString(RANDOM_STRING_LENGTH);
  error = new Error(Random.getString(RANDOM_STRING_LENGTH));
  timestamp = Date.now();
  methodToTest(message, error);
  loggingEvent = logService.lastLoggingEvent;
  expect(loggingEvent).toBeDefined();
  expect(loggingEvent?.level).toBe(level);
  expect(loggingEvent?.loggerName).toBe(logger.name);
  expect(loggingEvent?.message).toBe(message);
  expect(loggingEvent?.exception).toBe(error);
  expect(Math.abs((loggingEvent?.timestamp ?? 0) - timestamp)).toBeLessThan(TEN_MILLISECONDS);
}
