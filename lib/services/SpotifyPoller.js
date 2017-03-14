'use babel';

import DisplayBuilder from './DisplayBuilder';
import SpotifyClient from './SpotifyClient';
import { SpotifyApplicationClient } from 'spotify-application-client';

export default class SpotifyPoller {
  static getDisplayFields(isToggled) {
    return SpotifyApplicationClient.isSpotifyRunning()
      .then(isSpotifyRunning => {
        if (isSpotifyRunning) {
          return SpotifyPoller.getActiveDisplay();
        }

        return SpotifyStateViewBuilder.buildInactiveView();
      }).catch(e => {
        console.log(e);
      });
  }

  static getActiveDisplay() {
    return SpotifyApplicationClient.getStateDetails()
      .then(details => {
        SpotifyStateViewBuilder.buildActiveView(details);
      }).catch(e => {
        console.log(e);
      });
  }
}
