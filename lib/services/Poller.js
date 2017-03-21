'use babel';

import { SpotifyApplicationClient } from 'spotify-application-client';

import DisplayBuilder from './DisplayBuilder';
import DurationFormatter from './DurationFormatter';
import DurationTranslator from './DurationTranslator';
import DurationUnit from '../data/DurationUnit';
import SpotifyStateDetails from '../data/SpotifyStateDetails';
import SpotifyStateViewBuilder from './SpotifyStateViewBuilder';

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
    return Promise.all([
      SpotifyApplicationClient.getPlayerDetails(),
      SpotifyApplicationClient.getTrackDetails()
    ]).then( ([stateDetails, trackDetails]) => {
      const translatedSongPosition = this.translator.translate(stateDetails.positionInSeconds, DurationUnit.SECOND);
      const translatedSongDuration = this.translator.translate(trackDetails.durationInMilliseconds, DurationUnit.MILLISECOND);
      const details = new SpotifyStateDetails({
        song: trackDetails.name,
        album: trackDetails.albumName,
        artist: trackDetails.artistName,
        playerState: stateDetails.state,
        songPosition: this.formatter.format(translatedSongPosition),
        songDuration: this.formatter.format(translatedSongDuration),
        isShuffling: stateDetails.isShuffling,
        isRepeating: stateDetails.isRepeating
      });
      return this.viewBuilder.buildActiveView(details);
    }).catch(e => console.error(e));
  }
}
