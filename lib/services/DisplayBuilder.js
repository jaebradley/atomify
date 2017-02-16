'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {
  static buildInactiveSettingsDetails() {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    return `<img class="atomify-icon" src=${spotifyIconUrl} /> Not Open`;
  }

  static buildMusicDetails(spotifyStateDetails){
    return `${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} ( ${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration} )`;
  }

  static buildSettingsDetails(spotifyStateDetails) {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    const playerStateImageUrl = DisplayBuilder.getPlayerStateImageUrl(spotifyStateDetails.playerState);
    const playerSettingImages = DisplayBuilder.getPlayerSettingImages(spotifyStateDetails.isShuffling, spotifyStateDetails.isRepeating);

    const defaultSettings = `<img class="atomify-icon" src=${spotifyIconUrl} /> <img class="atomify-icon" src=${playerStateImageUrl} />`;
    if (playerSettingImages == undefined) {
      return defaultSettings;
    }

    return `${defaultSettings} ${playerSettingImages}`;
  }

  static getPlayerStateImageUrl(state) {
    switch (state) {
      case PlayerState.PLAYING: {
        return DisplayBuilder.getPlayIconUrl();
      }

      default: {
        return DisplayBuilder.getPauseIconUrl();
      }
    }
  }

  static getPlayerSettingImages(isShuffling, isRepeating) {
    if (!isShuffling && !isRepeating) {
      return undefined;
    }

    let images = '';
    if (isShuffling) {
      images += DisplayBuilder.buildIcon(DisplayBuilder.getShuffleIconUrl());
    }

    if (isRepeating) {
      images += DisplayBuilder.buildIcon(DisplayBuilder.getRepeatIconUrl());
    }

    return images;
  }

  static buildIcon(source) {
    return `<img class="atomify-icon" src='${source}' />`;
  }

  static getPauseIconUrl() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true';
  }

  static getPlayIconUrl() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true';
  }

  static getShuffleIconUrl() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true';
  }

  static getRepeatIconUrl() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true';
  }
}
