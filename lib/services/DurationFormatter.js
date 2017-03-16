'use babel';

import SecondsConverter from "seconds-converter";

export default class DurationFormatter {
  format(duration) {
    let formattedDuration = '';
    if (duration.days > 0) {
      formattedDuration += `${duration.days}:`;
    }

    if (duration.hours > 0) {
      formattedDuration += `${duration.hours}:`;
    }

    if (duration.minutes > 0) {
      formattedDuration += `${duration.minutes}:`;
    }

    formattedDuration += `${duration.seconds}`;

    return formattedDuration;
  }
}
