/* eslint-disable no-console -- console is being used as a last resort */

export /*not const*/ enum LevelValue {
  Debug = 100,
  Info = 200,
  Warn = 300,
  Error = 400,
  Fatal = 500,
  // eslint-disable-next-line @typescript-eslint/prefer-literal-enum-member -- constant is global scope
  Off = Number.MAX_VALUE
}

export class Level {
  public static readonly off: Level   = new Level(LevelValue.Off, 'off', 'OFF');
  public static readonly fatal: Level = new Level(LevelValue.Fatal, 'fatal', 'FATAL');
  public static readonly error: Level = new Level(LevelValue.Error, 'error', 'ERROR');
  public static readonly warn: Level  = new Level(LevelValue.Warn, 'warn',  'WARN');
  public static readonly info: Level  = new Level(LevelValue.Info, 'info',  'INFO');
  public static readonly debug: Level = new Level(LevelValue.Debug, 'debug', 'DEBUG');
  private static _levels: Map<string, Level> = Level.initializeLevels();
  private _displayName: string;

  private constructor(public readonly value: number,
                      public readonly name: string,
                      displayName: string) {
    this._displayName = displayName;
  }

  private static initializeLevels(): Map<string, Level> {
    return new Map<string, Level>([
      [this.off.name.toLowerCase(), this.off],
      [this.fatal.name.toLowerCase(), this.fatal],
      [this.error.name.toLowerCase(), this.error],
      [this.warn.name.toLowerCase(), this.warn],
      [this.info.name.toLowerCase(), this.info],
      [this.debug.name.toLowerCase(), this.debug]
    ]);
  }

  public static add(value: number, name: string, displayName: string): Level {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- allow for usage in a non-strict environment
    if (value === undefined || value === null) {
      console.error('LOG4NGX: A numeric value must be specified for \'value\'');
      throw new Error('LOG4NGX: A numeric value must be specified for \'value\'');
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- allow for usage in a non-strict environment
    if (name === undefined || name === null || name.length === 0) {
      console.error('LOG4NGX: A non-null, non-empty string value must be specified for \'name\'');
      throw new Error('LOG4NGX: A non-null, non-empty string value must be specified for \'name\'');
    }

    const key: string = name.toLowerCase();

    if (this._levels.has(key)) {
      console.error(`LOG4NGX: A level has already been defined with the name '${key}'`);
      throw new Error(`LOG4NGX: A level has already been defined with the name '${key}'`);
    }

    Level.ensureDisplayNameValid(displayName);

    const level: Level = new Level(value, name, displayName);
    this._levels.set(key, level);

    return level;
  }

  public static getLevel(levelName: string): Level | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- allow for usage in a non-strict environment
    if (levelName === undefined || levelName === null || levelName.length === 0) {
      console.error('LOG4NGX: No level name specified');
    }

    const level: Level | undefined = this._levels.get(levelName.toLowerCase());
    if (level === undefined) {
      console.error(`LOG4NGX: No level defined for '${levelName.toLowerCase()}'`);
    }

    return level;
  }

  public get displayName(): string {
    return this._displayName;
  }
  public set displayName(displayName: string) {
    Level.ensureDisplayNameValid(displayName);
    this._displayName = displayName;
  }

  private static ensureDisplayNameValid(displayName: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- allow for usage in a non-strict environment
    if (displayName === undefined || displayName === null) {
      console.error('LOG4NGX: A string value must be specified for \'displayName\'');
      throw new Error('LOG4NGX: A string value must be specified for \'displayName\'');
    }
  }
}
