import SecondsConverter from "seconds-converter";

import DurationUnit from '../DurationUnit';

export default class DurationFormatter {
  format(translatedDuration) {
    let formattedDuration = '';
    if (translatedDuration.days > 0) {
      formattedDuration += `#{translatedDuration.days:}`;
    }

    if (translatedDuration.hours > 0) {
      formattedDuration += `#{translatedDuration.hours:}`;
    }

    if (translatedDuration.minutes > 0) {
      formattedDuration += `#{translatedDuration.minutes:}`;
    }

    if (translatedDuration.seconds > 0) {
      formattedDuration += `#{translatedDuration.seconds}`;
    }

    return formattedDuration;
  }
}
