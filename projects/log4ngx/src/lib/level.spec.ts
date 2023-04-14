import { TestBed } from '@angular/core/testing';

import { Level } from './level';

describe('Level', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should define initial default levels', () => {
    let level: Level | undefined;

    level = Level.getLevel('off');
    expect(level).toEqual(Level.off);

    level = Level.getLevel('fatal');
    expect(level).toEqual(Level.fatal);

    level = Level.getLevel('error');
    expect(level).toEqual(Level.error);

    level = Level.getLevel('warn');
    expect(level).toEqual(Level.warn);

    level = Level.getLevel('info');
    expect(level).toEqual(Level.info);

    level = Level.getLevel('debug');
    expect(level).toEqual(Level.debug);
  });

  it('defines default levels in correct order', () => {
    expect(Level.off.value).toBeGreaterThan(Level.fatal.value);
    expect(Level.fatal.value).toBeGreaterThan(Level.error.value);
    expect(Level.error.value).toBeGreaterThan(Level.warn.value);
    expect(Level.warn.value).toBeGreaterThan(Level.info.value);
    expect(Level.info.value).toBeGreaterThan(Level.debug.value);
  });

  it('can define custom levels', () => {
    const value: number = 600;
    const name: string = 'catastrophic-' + Math.random().toString();
    const displayName: string = 'Catastrophic!';
    const customLevel: Level = Level.add(value, name, displayName);

    const newLevel: Level | undefined = Level.getLevel(name);
    expect(newLevel).toEqual(customLevel);
  });

  it('uses case-insensitive search for levels', () => {
    const value: number = 600;
    const name: string = 'CaTaStRoPhIc-' + Math.random().toString();
    const displayName: string = 'Catastrophic!';
    const level: Level = Level.add(value, name, displayName);

    expect(level.name).toEqual(name);

    let newLevel: Level | undefined = Level.getLevel(name.toUpperCase());
    expect(newLevel?.name).toEqual(name);
    newLevel = Level.getLevel(name.toLowerCase());
    expect(newLevel?.name).toEqual(name);
  });

  it('returns undefined for non-existent levels', () => {
    let nonexistentLevel: Level | undefined;

    nonexistentLevel = Level.getLevel('£$%^&*(');
    expect(nonexistentLevel).toBeUndefined();

    nonexistentLevel = Level.getLevel('');
    expect(nonexistentLevel).toBeUndefined();
  });

  describe('value property', () => {
/* eslint-disable @typescript-eslint/no-magic-numbers */
    it('allows any numeric value', () => {
      let value: number = -1000;
      let level: Level = Level.add(value, 'test-1000', 'test level -1000');
      expect(level.value).toEqual(value);

      value = -1.5;
      level = Level.add(value, 'test-1.5', 'test level -1.5');
      expect(level.value).toEqual(value);

      value = 0;
      level = Level.add(value, 'test0', 'test level 0');
      expect(level.value).toEqual(value);

      value = 1.5;
      level = Level.add(value, 'test1.5', 'test level 1.5');
      expect(level.value).toEqual(value);

      value = 1000;
      level = Level.add(value, 'test1000', 'test level 1000');
      expect(level.value).toEqual(value);
    });

    it('allows duplicate numeric value', () => {
      const value: number = 1234;
      let name: string = 'test-' + Math.random().toString();
      let displayName: string = name;
      let level: Level = Level.add(value, name, displayName);
      expect(level.value).toEqual(value);

      name = 'test-' + Math.random().toString();
      displayName = name;
      level = Level.add(value, name, displayName);
      expect(level.value).toEqual(value);
    });
/* eslint-enable @typescript-eslint/no-magic-numbers */

    it('throws an error if an undefined value is specified', () => {
      const name: string = 'test-' + Math.random().toString();
      const displayName: string = 'test level';

      expect(function() { Level.add(undefined, name, displayName) } ).toThrow();
    });

    it('throws an error if a null value is specified', () => {
      const name: string = 'test-' + Math.random().toString();
      const displayName: string = 'test level';

      expect(function() { Level.add(null, name, displayName) } ).toThrow();
    });
  });

  describe('name property', () => {
    it('throws an error if duplicate string value is specified', () => {
      const originalDebugLevel: Level = Level.debug;
      const name: string = originalDebugLevel.name;
      const newDebugValue: number = originalDebugLevel.value + 1;
      const newDebugDisplayName: string = '!!' + originalDebugLevel.displayName + '!!';

      expect(function() { Level.add(newDebugValue, name, newDebugDisplayName) } ).toThrow();
      const savedDebugLevel: Level | undefined = Level.getLevel(name);
      expect(savedDebugLevel).toEqual(originalDebugLevel);
    });

    it('throws an error if an empty string value is specified', () => {
      const value: number = 1000;
      const name: string = '';
      const displayName: string = 'test level';

      expect(function() { Level.add(value, name, displayName) } ).toThrow();
    });

    it('throws an error if an undefined value is specified', () => {
      const value: number = 1000;
      const name: string = undefined;
      const displayName: string = 'test level';

      expect(function() { Level.add(value, name, displayName) } ).toThrow();
    });

    it('throws an error if a null value is specified', () => {
      const value: number = 1000;
      const name: string = null;
      const displayName: string = 'test level';

      expect(function() { Level.add(value, name, displayName) } ).toThrow();
    });
  });

  describe('displayName property', () => {
    it('allows an empty string value', () => {
      const value: number = 1111;
      const name: string = 'test-' + Math.random().toString();
      const displayName: string = '';
      const level: Level = Level.add(value, name, displayName);
      expect(level.displayName).toEqual(displayName);
    });

    it('allows duplicate string value', () => {
      let value: number = 1111;
      let name: string = 'test-' + Math.random().toString();
      const displayName: string = 'test display name';
      let level: Level = Level.add(value, name, displayName);
      expect(level.displayName).toEqual(displayName);

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      value = 2222;
      name = 'test-' + Math.random().toString();
      level = Level.add(value, name, displayName);
      expect(level.displayName).toEqual(displayName);
    });

    it('throws an error if an undefined value is specified', () => {
      const value: number = 1000;
      const name: string = 'test-' + Math.random().toString();  /* Ensure it's unique, otherwise 'wrong' error may be thrown */
      const displayName: string = undefined;

      expect(function() { Level.add(value, name, displayName) } ).toThrow();
    });

    it('throws an error if a null value is specified', () => {
      const value: number = 1000;
      const name: string = 'test-' + Math.random().toString();  /* Ensure it's unique, otherwise 'wrong' error may be thrown */
      const displayName: string = null;

      expect(function() { Level.add(value, name, displayName) } ).toThrow();
    });

    it('is possible to change', () => {
      const level: Level = Level.fatal;
      const originalDisplayName: string = level.displayName;

      let newDisplayName: string = 'Catastrophic!';
      expect(newDisplayName).not.toEqual(originalDisplayName);  /* Just in case! */
      level.displayName = newDisplayName;
      expect(level.displayName).toEqual(newDisplayName);

      newDisplayName = 'Really CATASTROPHIC!!!!!';
      level.displayName = newDisplayName;
      expect(level.displayName).toEqual(newDisplayName);
    });
  });
});
