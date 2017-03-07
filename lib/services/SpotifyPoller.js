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

        return SpotifyPoller.getInactiveDisplay();
      }).catch(e => {
        console.log(e);
      });
  }

  static getActiveDisplay() {
    return SpotifyApplicationClient.getStateDetails()
      .then(details => {
        return new Promise((resolve, reject) => {
          resolve([DisplayBuilder.buildMusicDetails(details),
                   DisplayBuilder.buildSettingsDetails(details)]);
        });
      }).catch(e => {
        console.log(e);
      });
  }

  static getInactiveDisplay() {
    return new Promise((resolve, reject) => {
      resolve(['', DisplayBuilder.buildInactiveSettingsDetails()]);
    });
  }
}
