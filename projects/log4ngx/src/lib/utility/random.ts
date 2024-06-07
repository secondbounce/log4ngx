const ALPHA_CHARACTERS: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const MIXED_CHARACTERS: string = ALPHA_CHARACTERS + '`!"£$%^&*()-_=+{}[]#~;:@\',./<>?\\| ';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- won't make a habit of it, promise!
export class Random {
  public static getString(length: number, alphaNumericOnly: boolean = false): string {
    let value: string = '';
    const characters: string = alphaNumericOnly ? ALPHA_CHARACTERS
                                                : MIXED_CHARACTERS;

    while (value.length < length) {
      value += characters.charAt(Math.trunc(Math.random() * characters.length));
    }

    return value;
  }
}
