'use babel';

import moment from 'moment';
import { SpotifyApplicationClient } from 'spotify-application-client';

import DisplayBuilder from './DisplayBuilder';
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
        // Does not deal with hour case :-(
        songPosition: moment.utc(stateDetails.positionInSeconds * 1000).format("m:ss"),
        songDuration: moment.utc(trackDetails.durationInMilliseconds).format("m:ss"),
        isShuffling: stateDetails.isShuffling,
        isRepeating: stateDetails.isRepeating
      });
      return this.viewBuilder.buildActiveView(details);
    }).catch(e => console.error(e));
  }
}
