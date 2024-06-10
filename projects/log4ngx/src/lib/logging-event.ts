import { Level } from './level';

export class LoggingEvent {
  public readonly timestamp: number = Date.now();

  constructor(public level: Level,
              public loggerName: string,
              public message: string,
              public error?: Error) {}
}
