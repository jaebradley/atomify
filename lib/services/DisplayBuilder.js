'use babel';

import { List } from 'immutable';

import PlayerState from '../data/PlayerState';

export default class DisplayBuilder {

  static buildInactiveSettingsDetails() {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    return `<img src=${spotifyIconUrl} style="margin-right:5px" /> Not Open`;
  }

  static buildMusicDetails(spotifyStateDetails) {
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

  static buildDetails(spotifyStateDetails) {
    const spotifyIconImage = DisplayBuilder.buildSpotifyIconImage();
    const playerStateImage = DisplayBuilder.buildPlayerStateImage();
    const playerSettingImages = DisplayBuilder.getPlayerSettingImages();

    const baseSettings = `${spotifyIconImage} ${playerStateImage}`;
    if (playerSettingImages.isEmpty()) {
      return baseSettings;
    }

    return `${baseSettings} ${playerSettingImages.join(" ")}`;
  }

  static buildSpotifyIconImage() {
    return DisplayBuilder.buildImageTag(DisplayBuilder.getSpotifyIconSource());
  }

  static buildPlayerStateImage(state) {
    return DisplayBuilder.buildImageTag(DisplayBuilder.getPlayerStateImageUrl(state));
  }

  static getPlayerStateImageUrl(state) {
    switch (state) {
      case PlayerState.PLAYING: {
        return DisplayBuilder.getPlayingImageSource();
      }

      case PlayerState.PAUSED: {
        return DisplayBuilder.getPausedImageSource();
      }

      default: {
        throw new Exception("Unexpected player state");
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
  static buildPlayerSettingImages(stateDetails) {
    return DisplayBuilder.buildPlayerSettingImages().join(" ");
  }

  static buildPlayerSettingImages(stateDetails) {
    let images = new List();

    if (stateDetails.isShuffling) {
      images = images.add(DisplayBuilder.buildImageTag(DisplayBuilder.getShuffleImageSource()));
    }

    if (stateDetails.isRepeating) {
      images = images.add(DisplayBuilder.buildImageTag(DisplayBuilder.getRepeatImageSource()));
    }

    return images;
  }

  static buildImageTag(source) {
    return `<img class="atomify-image" src=${source} />`;
  }

  static getShuffleImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true";
  }

  static getRepeatImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true";
  }

  static getPlayingImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true";
  }

  static getPausedImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true";
  }

  static getSpotifyIconSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true";
  }
}
