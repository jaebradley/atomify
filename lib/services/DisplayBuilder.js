'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {

  static getPlayerStateImageUrl(state) {
    switch (state) {
      case PlayerState.PLAYING: {
        return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true';
      }

      default: {
        return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true';
      }
    }
  }
}