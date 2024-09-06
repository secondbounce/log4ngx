import { TestBed } from '@angular/core/testing';

import { AppenderPlaceholders, MOCK_APPENDER_TOKEN, MockAppender, MOCKATOO_APPENDER_TOKEN, MockatooAppender } from './appenders';
import { Level, LevelValue } from './level';
import { LOG_SERVICE_CONFIG_TOKEN, LogServiceConfig } from './log-service-config';
import { LogService } from './log.service';
import { Logger } from './logger';
import { Random } from './utility';

const RANDOM_LEVEL_NAME_LENGTH: number = 20;
const RANDOM_APPENDER_NAME_LENGTH: number = 20;
const RANDOM_LOGGER_NAME_LENGTH: number = 20;
const RANDOM_MESSAGE_LENGTH: number = 120;
const MOCK_LOGGER_NAME: string = 'mockLogger';
const MOCKATOO_LOGGER_NAME: string = 'mockatooLogger';
const BOTH_LOGGER_NAME: string = 'bothLogger';
const BAD_LEVEL_LOGGER_NAME: string = 'bad-level';
const MISSING_APPENDER_LOGGER_NAME: string = 'missingAppender';
const MOCK_APPENDER_NAME: string = 'mockAppender';
const MOCKATOO_APPENDER_NAME: string = 'mockatooAppender';
const LOG_SERVICE_CONFIG: LogServiceConfig = {
  loggers: [
    /* IMPORTANT! There's no 'root' logger here since we don't want a 'fallback' logger to be found */
    {
      loggerName: MOCK_LOGGER_NAME,
      level: 'info',
      appenderNames: [
        MOCK_APPENDER_NAME
      ]
    },
    {
      loggerName: MOCKATOO_LOGGER_NAME,
      level: 'info',
      appenderNames: [
        MOCKATOO_APPENDER_NAME
      ]
    },
    {
      loggerName: BOTH_LOGGER_NAME,
      level: 'info',
      appenderNames: [
        MOCK_APPENDER_NAME,
        MOCKATOO_APPENDER_NAME
      ]
    },
    {
      loggerName: BAD_LEVEL_LOGGER_NAME,
      level: Random.getString(RANDOM_LEVEL_NAME_LENGTH),
      appenderNames: [
        MOCK_APPENDER_NAME
      ]
    },
    {
      loggerName: MISSING_APPENDER_LOGGER_NAME,
      level: 'info',
      appenderNames: [
        Random.getString(RANDOM_APPENDER_NAME_LENGTH),
        MOCK_APPENDER_NAME
      ]
    }
  ],
  appenders: [
    {
      name: MOCK_APPENDER_NAME,
      providerToken: MOCK_APPENDER_TOKEN,
      logFormat: MOCK_APPENDER_NAME + ':' + AppenderPlaceholders.Message,  /* So we can check the output easily */
      errorFormat: undefined
    },
    {
      name: MOCKATOO_APPENDER_NAME,
      providerToken: MOCKATOO_APPENDER_TOKEN,
      logFormat: MOCKATOO_APPENDER_NAME + ':' + AppenderPlaceholders.Message,  /* So we can check the output easily */
      errorFormat: undefined
    }
  ]
};

// TODO: test a config that includes an appender twice with different configs

describe('LogService', () => {
  let logService: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MOCK_APPENDER_TOKEN, useClass: MockAppender },
        { provide: MOCKATOO_APPENDER_TOKEN, useClass: MockatooAppender },
        { provide: LOG_SERVICE_CONFIG_TOKEN, useValue: LOG_SERVICE_CONFIG }
      ]
    });

    logService = TestBed.inject(LogService);
    MockAppender.lastOutput = '';
    MockatooAppender.lastOutput = '';
  });

  describe('`getLogger(string)` method', () => {
    it('should create a new logger if name doesn\'t exist', () => {
      const loggerName: string = Random.getString(RANDOM_LOGGER_NAME_LENGTH);
      const logger: Logger = logService.getLogger(loggerName);

      expect(logger).toBeDefined();
      expect(logger.name).toBe(loggerName);
    });

    it('should return cached copy of logger if name already exists', () => {
      const loggerName: string = Random.getString(RANDOM_LOGGER_NAME_LENGTH);
      const logger: Logger = logService.getLogger(loggerName);

      expect(logger).toBeDefined();
      expect(logService.getLogger(loggerName)).toBe(logger);
    });
  });

  describe('`getLogger(object)` method', () => {
    it('should create a new logger if object\'s type name doesn\'t exist', () => {
      const instance: object = {};
      const logger: Logger = logService.getLogger(instance);

      expect(logger).toBeDefined();
      expect(logger.name).toBe('Object');
    });

    it('should cache loggers under the object\'s type name', () => {
      const instance: object = new MockAppender();
      const logger: Logger = logService.getLogger(instance);

      expect(logger).toBeDefined();
      expect(logger.name).toBe('MockAppender');
      expect(logService.getLogger('MockAppender')).toBe(logger);
    });

    it('should return cached copy of logger if object\'s type name already exists', () => {
      const instance: object = new MockAppender();
      const logger: Logger = logService.getLogger(instance);

      expect(logger).toBeDefined();
      expect(logService.getLogger(instance)).toBe(logger);
    });
  });

  describe('`dispatch` method', () => {
    it('uses the corresponding `LoggerConfig` if it exists', () => {
      let logger: Logger;
      let message: string;

      logger = logService.getLogger(MOCK_LOGGER_NAME);
      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.info(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);

      logger = logService.getLogger(MOCKATOO_LOGGER_NAME);
      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.info(message);
      expect(MockatooAppender.lastOutput).toBe(MOCKATOO_APPENDER_NAME + ':' + message);
    });

    it('uses the \'root\' `LoggerConfig` if it exists and the named one doesn\'t', () => {
      const logServiceConfig: LogServiceConfig = {
        loggers: [
          {
            loggerName: '',
            level: 'info',
            appenderNames: [
              MOCK_APPENDER_NAME
            ]
          },
          { /* Included so we can check it's unused */
            loggerName: MOCKATOO_LOGGER_NAME,
            level: 'info',
            appenderNames: [
              MOCKATOO_APPENDER_NAME
            ]
          }
        ],
        appenders: [
          {
            name: MOCK_APPENDER_NAME,
            providerToken: MOCK_APPENDER_TOKEN,
            logFormat: MOCK_APPENDER_NAME + ':' + AppenderPlaceholders.Message,  /* So we can check the output easily */
            errorFormat: undefined
          },
          { /* Included so we can check it's unused */
            name: MOCKATOO_APPENDER_NAME,
            providerToken: MOCKATOO_APPENDER_TOKEN,
            logFormat: MOCKATOO_APPENDER_NAME + ':' + AppenderPlaceholders.Message,  /* So we can check the output easily */
            errorFormat: undefined
          }
        ]
      };

      logService.configure(logServiceConfig);

      const logger: Logger = logService.getLogger(Random.getString(RANDOM_LOGGER_NAME_LENGTH));
      const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);

      logger.info(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);
      expect(MockatooAppender.lastOutput).toBe('');
    });

    it('ignores the dispatch if the named and \'root\' `LoggerConfigs` don\'t exist', () => {
      const logger: Logger = logService.getLogger(Random.getString(RANDOM_LOGGER_NAME_LENGTH));
      const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);

      logger.info(message);
      expect(MockAppender.lastOutput).toBe('');
    });

    it('ignores the dispatch if the `Level` doesn\'t exist', () => {
      const logger: Logger = logService.getLogger(BAD_LEVEL_LOGGER_NAME);
      const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);

      logger.info(message);
      expect(MockAppender.lastOutput).toBe('');
    });

    it('uses the configured level to determine log dispatch', () => {
      /* All loggers are configured for Level.info */
      const belowInfoLevel: Level = Level.add(LevelValue.Info - 1, 'below-info', 'below-info');
      const aboveInfoLevel: Level = Level.add(LevelValue.Info + 1, 'above-info', 'above-info');
      const logger: Logger = logService.getLogger(MOCK_LOGGER_NAME);
      let message: string;

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.debug(message);
      expect(MockAppender.lastOutput).toBe('');

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.log(belowInfoLevel.name, message);
      expect(MockAppender.lastOutput).toBe('');

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.info(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.log(aboveInfoLevel.name, message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.warn(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.error(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);

      message = Random.getString(RANDOM_MESSAGE_LENGTH);
      logger.fatal(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);
    });

    it('can dispatch to multiple `Appender`s', () => {
      const logger: Logger = logService.getLogger(BOTH_LOGGER_NAME);
      const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);

      logger.info(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);
      expect(MockatooAppender.lastOutput).toBe(MOCKATOO_APPENDER_NAME + ':' + message);
    });

    it('ignores non-existent `Appender`s during dispatch', () => {
      const logger: Logger = logService.getLogger(MISSING_APPENDER_LOGGER_NAME);
      const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);

      logger.info(message);
      expect(MockAppender.lastOutput).toBe(MOCK_APPENDER_NAME + ':' + message);
    });
  });
});
