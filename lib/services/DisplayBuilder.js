'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {
  static buildInactiveSettingsDetails() {
    return `${DisplayBuilder.buildIcon(DisplayBuilder.getSpotifyIconUrl())} Not Open`;
  }

  static buildMusicDetails(spotifyStateDetails){
    return `${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} ( ${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration} )`;
  }

  static buildSettingsDetails(spotifyStateDetails) {
    const playerStateImageUrl = DisplayBuilder.getPlayerStateImageUrl(spotifyStateDetails.playerState);
    const playerSettingImages = DisplayBuilder.getPlayerSettingImages(spotifyStateDetails.isShuffling, spotifyStateDetails.isRepeating);
    const spotifyIcon = DisplayBuilder.buildIcon(DisplayBuilder.getSpotifyIconUrl())
    const playerStateIcon = DisplayBuilder.buildIcon(playerStateImageUrl);

    const defaultSettings = `${spotifyIcon} ${playerStateIcon}`;

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

  static getSpotifyIconUrl() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
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
