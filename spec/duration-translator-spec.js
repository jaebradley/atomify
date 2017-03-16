'use babel';

import DurationUnit from '../lib/data/DurationUnit';
import DurationTranslator from '../lib/services/DurationTranslator';

describe('Duration Translator', function() {
  const translator = new DurationTranslator();

  it('fetch abbreviation', function() {
    expect(translator.getAbbreviation(DurationUnit.SECOND)).toEqual('sec');
    expect(translator.getAbbreviation(DurationUnit.MILLISECOND)).toEqual('ms');
    expect(() => translator.getAbbreviation(1)).toThrow(TypeError('Unexpected duration unit'));
  });

  it('translates duration', function() {
    const translation = translator.translate(60, DurationUnit.SECOND);
    const expected = {
      days: 0,
      hours: 0,
      minutes: 1,
      seconds: 0
    };
    expect(translation).toEqual(expected);
  });
});
