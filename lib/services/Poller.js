'use babel';

import { SpotifyApplicationClient } from 'spotify-application-client';

import DisplayBuilder from './DisplayBuilder';
import DurationFormatter from './DurationFormatter';
import DurationTranslator from './DurationTranslator';
import DurationUnit from '../data/DurationUnit';
import SpotifyStateDetails from './SpotifyStateDetails';

export default class Poller {
  constructor() {
    this.translator = new DurationTranslator();
    this.formatter = new DurationFormatter();
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
    return new Promise.all([
      SpotifyApplicationClient.getStateDetails(),
      SpotifyApplicationClient.getTrackDetails()
    ]).then((stateDetails, trackDetails) => {
      const translatedSongPosition = this.translator(stateDetails.positionInSeconds, Duration.SECOND);
      const translatedSongDuration = this.translator(trackDetails.durationInMilliseconds, DurationUnit.MILLISECOND);
      const stateDetails = new SpotifyStateDetails({
        song: trackDetails.name,
        album: trackDetails.albumName,
        artist: trackDetails.artistName,
        playerState: stateDetails.state,
        songPosition: this.formatter(translatedSongPosition),
        songDuration: this.formatter(translatedSongDuration),
        isShuffling: stateDetails.isShuffling,
        isRepeating: stateDetails.isRepeating
      });
      return this.viewBuilder.buildActiveView(stateDetails);
    }).catch(e => console.error(e));
  }
}
