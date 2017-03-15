'use babel';

import DurationUnit from '../lib/data/DurationUnit';
import DurationTranslator from '../lib/services/DurationTranslator';

describe('Duration Translator', function() {
  const translator = new DurationTranslator();

  it('fetch abbreviation', function() {
    expect(translator.getAbbreviation(DurationUnit.SECOND)).toEqual('s');
    expect(translator.getAbbreviation(DurationUnit.MILLISECOND)).toEqual('ms');
    expect(() => translator.getAbbreviation(1)).toThrow(TypeError('Unexpected duration unit'));
  });
});
