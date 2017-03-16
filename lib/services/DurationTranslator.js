'use babel';

import SecondsConverter from 'seconds-converter';

import DurationUnit from '../data/DurationUnit';

export default class DurationTranslator {
  translate(value, fromUnit) {
    const abbreviation = this.getAbbreviation(fromUnit);
    return SecondsConverter(value, abbreviation);
  }

  getAbbreviation(unit) {
    switch (unit) {
      case DurationUnit.SECOND: {
        return 'sec';
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
