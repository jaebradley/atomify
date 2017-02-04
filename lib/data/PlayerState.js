'use babel';

import {Enum} from 'enumify';

export default class PlayerState extends Enum {
  static valueOf(value) {
    for (const state of PlayerState.enumValues) {
      if (state.value == value) {
        return state;
      }
    }
  }
};

PlayerState.initEnum({
  PLAYING: {
    value: 'playing'
  },
  PAUSED: {
    value: 'paused'
  },
});
