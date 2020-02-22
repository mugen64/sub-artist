import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import subs from '~/logic/subtitles';

momentDurationFormatSetup(moment); // TODO is there a better way of doin this
const subtitleLogic = subs(moment);

describe('Subtitles Logic', () => {
  describe('formatTimeFromFloat', () => {
    it('should accept a float/number value representing time in seconds and return a formatted time string in webvtt time format', () => {
      expect(subtitleLogic.formatTimeFromFloat(0.0)).toEqual('00:00:00.000');
      expect(subtitleLogic.formatTimeFromFloat(1)).toEqual('00:00:01.000');
      expect(subtitleLogic.formatTimeFromFloat(1.0)).toEqual('00:00:01.000');
      expect(subtitleLogic.formatTimeFromFloat(1.001)).toEqual('00:00:01.001');
      expect(subtitleLogic.formatTimeFromFloat(97200.001)).toEqual(
        '27:00:00.001'
      );
    });
  });

  describe('isTimeBetween', () => {
    it('should accept three time values in webvtt time format and return true if the first value is between times a and b where a is before b', () => {
      // given times a, b,c
      const a = '00:00:01.00';
      const b = '00:00:00.00';
      const c = '00:02:00.00';
      // we expect that a is between b and c to be true
      expect(subtitleLogic.isTimeBetween(a, b, c)).toBe(true);
      // and a is between c and b to be false
      expect(subtitleLogic.isTimeBetween(a, c, b)).toBe(false);
    });

    it('should accept three time values in webvtt time format and return false if the first value is not between times a and b or is equal to either regardless whether a or b is before the other', () => {
      // given times a, b,c
      let a = '00:00:01.00';
      const b = '10:00:00.00';
      const c = '00:02:00.00';
      // we expect that a is between b and c to be false
      expect(subtitleLogic.isTimeBetween(a, b, c)).toBe(false);
      // and a is between c and b to be false
      expect(subtitleLogic.isTimeBetween(a, c, b)).toBe(false);

      // if a is equal to either b or c
      a = b;
      // then we expect a is between b and c to be false
      expect(subtitleLogic.isTimeBetween(a, b, c)).toBe(false);
      // likewise a is between c and b to be is also false
      expect(subtitleLogic.isTimeBetween(a, c, b)).toBe(false);
    });
  });
});
