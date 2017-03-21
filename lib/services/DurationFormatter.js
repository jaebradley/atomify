'use babel';

import SecondsConverter from "seconds-converter";

export default class DurationFormatter {
  format(duration) {
    let formattedDuration = '';
    if (duration.days > 0) {
      formattedDuration += `${Math.round(duration.days)}:`;
    }

    if (duration.hours > 0) {
      formattedDuration += `${Math.round(duration.hours)}:`;
    }

    formattedDuration += `${Math.round(duration.minutes)}:${Math.round(duration.seconds)}`;

    return formattedDuration;
  }
}
