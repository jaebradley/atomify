'use babel';

import { List } from 'immutable';

import { PlayerState } from 'spotify-application-client';
import SpotifyStateView from '../data/SpotifyStateView';

export default class SpotifyStateViewBuilder {

  buildInactiveView() {
    const view = new SpotifyStateView({
      spotifyIcon: this.buildSpotifyIconImage(),
      settingsDetails: 'Not Open',
      musicDetails: ''
    });

    return new Promise((resolve, reject) => {
      resolve(view);
    }).catch(e => console.error(e));
  }

  buildActiveView(stateDetails) {
    const view = new SpotifyStateView({
      spotifyIcon: this.buildSpotifyIconImage(),
      settingsDetails: this.buildPlayerSettingsDetails(stateDetails),
      musicDetails: this.buildMusicDetails(stateDetails)
    });

    return new Promise((resolve, reject) => {
      resolve(view);
    }).catch(e => console.error(e));
  }

  buildMusicDetails(spotifyStateDetails) {
    return `${spotifyStateDetails.song} | ${spotifyStateDetails.artist} | ${spotifyStateDetails.album} (${spotifyStateDetails.songPosition} / ${spotifyStateDetails.songDuration})`;
  }

  buildPlayerSettingsDetails(stateDetails) {
    const playerStateImage = this.buildPlayerStateImage();
    const playerSettingsImages = this.buildPlayerSettingsImages(stateDetails);

    if (playerSettingImages.isEmpty()) {
      return playerStateImage;
    }

    return `${playerStateImage} ${playerSettingsImages.join(" ")}`;
  }

  buildPlayerStateImage(state) {
    return this.buildImageTag(this.getPlayerStateImageUrl(state));
  }

  getPlayerStateImageUrl(state) {
    switch (state) {
      case PlayerState.PLAYING: {
        return this.getPlayingImageSource();
      }

      case PlayerState.PAUSED: {
        return this.getPausedImageSource();
      }

      default: {
        throw new TypeError("Unexpected player state");
      }
    }
  }

  buildPlayerSettingsImages(stateDetails) {
    let images = new List();

    if (stateDetails.isShuffling) {
      images = images.push(this.buildShuffleImage());
    }

    if (stateDetails.isRepeating) {
      images = images.push(this.buildRepeatImage());
    }

    return images;
  }

  buildShuffleImage() {
    return this.buildImageTag(this.getShuffleImageSource());
  }

  buildRepeatImage() {
    return this.buildImageTag(this.getRepeatImageSource());
  }

  buildSpotifyIconImage() {
    return this.buildImageTag(this.getSpotifyIconSource());
  }

  buildImageTag(source) {
    return `<img class="atomify-image" src=${source} />`;
  }

  getShuffleImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true";
  }

  getRepeatImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true";
  }

  getPlayingImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true";
  }

  getPausedImageSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true";
  }

  getSpotifyIconSource() {
    return "https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true";
  }
}
