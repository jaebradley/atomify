'use babel';

import { List } from 'immutable';

import { PlayerState } from 'spotify-application-client';
import SpotifyStateView from '../data/SpotifyStateView';

export default class SpotifyStateViewer {

  static buildInactiveView() {
    return new SpotifyStateView({
      spotifyIcon: SpotifyStateViewBuilder.buildSpotifyIconImage(),
      settingsDetails: 'Not Open',
      musicDetails: ''
    });
  }

  static buildActiveView(stateDetails) {
    return new SpotifyStateView({
      spotifyIcon: SpotifyStateViewBuilder.buildSpotifyIconImage(),
      settingsDetails: SpotifyStateViewBuilder.buildPlayerSettingsDetails(stateDetails),
      musicDetails: SpotifyStateViewBuilder.buildMusicDetails(stateDetails);
    });
  }

  static buildInactiveSettingsDetails() {
    const spotifyIconUrl = 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
    return `<img src=${spotifyIconUrl} style="margin-right:5px" /> Not Open`;
  }

  static buildMusicDetails(spotifyStateDetails) {
    return `${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} (${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration})`;
  }

  static buildPlayerSettingsDetails(stateDetails) {
    const playerStateImage = DisplayBuilder.buildPlayerStateImage();
    const playerSettingImages = DisplayBuilder.getPlayerSettingImages(stateDetails);

    if (playerSettingImages.isEmpty()) {
      return playerStateImage;
    }

    return `${playerStateImage} ${playerSettingImages.join(" ")}`;
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

  static buildSpotifyIconImage() {
    return SpotifyStateViewBuilder.buildImageTag(SpotifyStateViewBuilder.getSpotifyIconSource());
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
