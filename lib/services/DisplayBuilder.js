'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {

  static buildMusicDetails(spotifyStateDetails){
    const playerStateImageUrl = DisplayBuilder.getPlayerStateImageUrl(spotifyStateDetails.playerState);
    return `<img src=${playerStateImageUrl} /> ${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} (${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration})`;
  }

  static buildSettingsDetails(spotifyStateDetails) {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    const playerSettingImageUrl = DisplayBuilder.getPlayerSettingImageUrl(spotifyStateDetails.isShuffling, spotifyStateDetails.isRepeating);

    const defaultSettings = `<img src=${spotifyIconUrl} />`;
    if (playerSettingImageUrl == undefined) {
      return defaultSettings;
    }

    return `${defaultSettings} <img src=${playerSettingImageUrl} />`;
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

    return undefined;
  }
}
