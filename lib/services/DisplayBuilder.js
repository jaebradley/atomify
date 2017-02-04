'use babel';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {

  static buildInactiveSettingsDetails() {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    return `<img src=${spotifyIconUrl} style="margin-right:5px" /> Has Been Deactivated`;
  }

  static buildMusicDetails(spotifyStateDetails){
    return `${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} (${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration})`;
  }

  static buildSettingsDetails(spotifyStateDetails) {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    const playerStateImageUrl = DisplayBuilder.getPlayerStateImageUrl(spotifyStateDetails.playerState);
    const playerSettingImages = DisplayBuilder.getPlayerSettingImages(spotifyStateDetails.isShuffling, spotifyStateDetails.isRepeating);

    const defaultSettings = `<img src=${spotifyIconUrl} style="margin-right:5px" /> <img src=${playerStateImageUrl} style="margin-right:5px" />`;
    if (playerSettingImages == undefined) {
      return defaultSettings;
    }

    return `${defaultSettings} ${playerSettingImages}`;
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

  static getPlayerSettingImages(isShuffling, isRepeating) {
    if (!isShuffling && !isRepeating) {
      return undefined;
    }

    let images = '';
    if (isShuffling) {
      images += `<img src='https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true' style="margin-right:5px" />`;
    }

    if (isRepeating) {
      images += `<img src='https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true' style="margin-right:5px" />`;
    }

    return images;
  }
}
