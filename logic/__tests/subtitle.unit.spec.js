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

  describe('isTimeBefore', () => {
    it('should accept two time values a and b in webvtt time format and return true if a is before b', () => {
      // given times a, b
      const a = '00:00:01.00';
      const b = '00:00:20.00';
      // we expect that a is before b
      expect(subtitleLogic.isTimeBefore(a, b)).toBe(true);
      // and b is not before a
      expect(subtitleLogic.isTimeBefore(b, a)).toBe(false);
    });

    it('should accept two time values a and b in webvtt time format and return false if a is not before or is equal to b', () => {
      // given times a, b
      let a = '00:00:20.00';
      const b = '00:00:01.00';
      // we expect that a is not before b
      expect(subtitleLogic.isTimeBefore(a, b)).toBe(false);
      // and b is before a
      expect(subtitleLogic.isTimeBefore(b, a)).toBe(true);

      a = b;
      expect(subtitleLogic.isTimeBefore(a, b)).toBe(false);
      expect(subtitleLogic.isTimeBefore(b, a)).toBe(false);
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

  describe('generateWebVttTextFromObjArray', () => {
    it('should generate a string of cues in webvtt format from an array of subtitle cue objects', () => {
      // given an array of subtitles
      const subs = [
        {
          start: '00:00:00.000',
          end: '00:00:07.978',
          text: 'The Following is a conversation with Andrew Ng.'
        }
      ];
      const expectedToHave = `
1
00:00:00.000 --> 00:00:07.978
The Following is a conversation with Andrew Ng.
`;
      expect(subtitleLogic.generateWebVttTextFromObjArray(subs)).toContain(
        expectedToHave
      );
    });
  });

  describe('generateObjArrayFromWebVttText', () => {
    it('should generate a string of cues in webvtt format from an array of subtitle cue objects', () => {
      // given an webvtt text
      const expectedToHave = `
1
00:00:00.000 --> 00:00:07.978
The Following is a conversation with Andrew Ng.
`;
      const subs = [
        {
          start: '00:00:00.000',
          end: '00:00:07.978',
          text: 'The Following is a conversation with Andrew Ng.'
        }
      ];
      expect(
        subtitleLogic.generateObjArrayFromWebVttText(expectedToHave)
      ).toEqual(subs);
    });
  });
});
