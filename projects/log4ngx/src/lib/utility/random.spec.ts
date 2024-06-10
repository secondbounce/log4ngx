/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Random } from './random';

describe('Random', () => {
  describe('getString()', () => {
    it('should return empty string if length is zero or less', () => {
      let randomString: string;

      randomString = Random.getString(0);
      expect(randomString).toBe('');
      randomString = Random.getString(-1);
      expect(randomString).toBe('');
    });

    it('should return the correct string length', () => {
      let randomString: string;

      [1, 100, 1000].forEach((length) => {
        randomString = Random.getString(length);
        expect(randomString.length).toBe(length);
      });
    });

    it('should only return alphanumeric chars if `alphaNumericOnly` is true', () => {
      /* Obviously, we can't *guarantee* this but if we choose a large enough string
        length, we can be fairly sure it works.
      */
      const randomString: string = Random.getString(1000, true);
      expect(/[^\dA-Za-z]/.test(randomString)).toBeFalse();
    });

    it('should return non-alphanumeric chars if `alphaNumericOnly` is false', () => {
      /* Obviously, we can't *guarantee* this but if we choose a large enough string
        length, we can be fairly sure it works.
      */
      const randomString: string = Random.getString(1000, false);
      expect(/[^\dA-Za-z]/.test(randomString)).toBeTrue();
    });
  });
});
