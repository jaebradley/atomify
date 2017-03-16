'use babel';

import DurationFormatter from '../lib/services/DurationFormatter';

describe('Duration Formatter', function() {
  const formatter = new DurationFormatter();
  let emptyDuration = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  let nonEmptyDuration = {
    days: 1,
    hours: 2,
    minutes: 3,
    seconds: 4
  }

  it('format duration', function() {
    expect(formatter.format(emptyDuration)).toEqual('0');
    expect(formatter.format(nonEmptyDuration)).toEqual('1:2:3:4');
  });
});
