'use babel';

import SecondsConverter from 'seconds-converter';

import DurationUnit from '../data/DurationUnit';

export default class DurationTranslator {
  getTranslatedDuration(value, fromUnit) {
    const abbreviation = getAbbreviation(fromUnit);
    return SecondsConverter(value, abbreviation);
  }

  getAbbreviation(unit) {
    switch (unit) {
      case DurationUnit.SECOND: {
        return 's';
      }

      case DurationUnit.MILLISECOND: {
        return 'ms';
      }

      default: {
        throw new TypeError('Unexpected duration unit');
      }
    }
  }
}
