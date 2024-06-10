/* eslint-disable no-console -- duh! */
import { inject, TestBed } from '@angular/core/testing';

import { ConsoleService } from './console.service';
import { Random } from './utility';

const RANDOM_MESSAGE_LENGTH: number = 120;

describe('ConsoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsoleService
      ]
    });

    spyOn(console, 'debug');
    spyOn(console, 'error');
    spyOn(console, 'info');
    spyOn(console, 'log');
    spyOn(console, 'trace');
    spyOn(console, 'warn');
  });

  it('should render debug messages via console.debug()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.debug(message);
    expect(console.debug).toHaveBeenCalledWith(message);

    service.debug(message, arg0, arg1, arg2);
    expect(console.debug).toHaveBeenCalledWith(message, args);
  }));

  it('should render error messages via console.error()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.error(message);
    expect(console.error).toHaveBeenCalledWith(message);

    service.error(message, arg0, arg1, arg2);
    expect(console.error).toHaveBeenCalledWith(message, args);
  }));

  it('should render info messages via console.info()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.info(message);
    expect(console.info).toHaveBeenCalledWith(message);

    service.info(message, arg0, arg1, arg2);
    expect(console.info).toHaveBeenCalledWith(message, args);
  }));

  it('should render log messages via console.log()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.log(message);
    expect(console.log).toHaveBeenCalledWith(message);

    service.log(message, arg0, arg1, arg2);
    expect(console.log).toHaveBeenCalledWith(message, args);
  }));

  it('should render trace messages via console.trace()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.trace(message);
    expect(console.trace).toHaveBeenCalledWith(message);

    service.trace(message, arg0, arg1, arg2);
    expect(console.trace).toHaveBeenCalledWith(message, args);
  }));

  it('should render warn messages via console.warn()', inject([ConsoleService], (service: ConsoleService) => {
    const message: string = Random.getString(RANDOM_MESSAGE_LENGTH);
    const arg0: number = 123;
    const arg1: string = 'foo';
    const arg2: boolean = true;
    const args: any[] = [arg0, arg1, arg2];

    service.warn(message);
    expect(console.warn).toHaveBeenCalledWith(message);

    service.warn(message, arg0, arg1, arg2);
    expect(console.warn).toHaveBeenCalledWith(message, args);
  }));
});
