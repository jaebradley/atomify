'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {

  static build(spotifyStateDetails){
    const playerStateImageUrl = DisplayBuilder.getPlayerStateImageUrl(spotifyStateDetails.playerState);
    const playerSettingImageUrl = DisplayBuilder.getPlayerSettingImageUrl(spotifyStateDetails.isShuffling, spotifyStateDetails.isRepeating);
    return `<img src=${playerStateImageUrl} /> ${spotifyStateDetails.song} by ${spotifyStateDetails.artist} from ${spotifyStateDetails.album} (${spotifyStateDetails.songPosition} of ${spotifyStateDetails.songDuration})`;
  }

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

  static getPlayerSettingImageUrl(isShuffling, isRepeating) {
    if (isShuffling) {
      return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true';
    }

    if (isRepeating) {
      return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true';
    }

    return '';
  }
}
