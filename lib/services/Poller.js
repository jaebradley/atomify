'use babel';

import moment from 'moment';
import { SpotifyApplicationClient } from 'spotify-application-client';

import SpotifyStateDetails from '../data/SpotifyStateDetails';
import SpotifyStateViewBuilder from './SpotifyStateViewBuilder';

export default class Poller {
  constructor() {
    this.viewBuilder = new SpotifyStateViewBuilder();
  }

  getDisplayFields(isToggled) {
    return SpotifyApplicationClient.isSpotifyRunning()
      .then(isSpotifyRunning => {
        if (isSpotifyRunning) {
          return this.getActiveDisplay();
        }

        return this.viewBuilder.buildInactiveView();
      }).catch(e => console.error(e));
  }

  getActiveDisplay() {
    return Promise.all([
      SpotifyApplicationClient.getPlayerDetails(),
      SpotifyApplicationClient.getTrackDetails()
    ]).then( ([stateDetails, trackDetails]) => {
      const details = new SpotifyStateDetails({
        song: trackDetails.name,
        album: trackDetails.albumName,
        artist: trackDetails.artistName,
        playerState: stateDetails.state,
        songPosition: this.format(stateDetails.positionInSeconds * 1000),
        songDuration: this.format(trackDetails.durationInMilliseconds),
        isShuffling: stateDetails.isShuffling,
        isRepeating: stateDetails.isRepeating
      });
      return this.viewBuilder.buildActiveView(details);
    }).catch(e => console.error(e));
  }

  format(durationInMilliseconds) {
    // Does not deal with hour case :-(
    // Also, hacky as shit
    return moment.utc(durationInMilliseconds).format("m:ss");
  }
}
