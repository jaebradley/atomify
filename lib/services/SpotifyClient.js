'use babel';

import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';

export default class SpotifyClient {
  static getSong() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_SONG);
  }

  static getAlbum() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_ALBUM);
  }

  static getArtist() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_ARTIST);
  }

  static getPlayerState() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_PLAYER_STATE)
                        .then(stateValue => PlayerState.valueOf(stateValue));
  }

  static getSongPosition() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_SONG_POSITION);
  }

  static getSongDuration() {
    return SpotifyClient.executeCommand(SpotifyCommands.GET_SONG_DURATION);
  }

  static executeCommand(command) {
    if (!(command instanceof SpotifyCommands)) {
      throw new TypeError('Expected a Spotify Command');
    }

    return new Promise((resolve, reject) => {
      osascript.execute(command.value, function(err, result, raw) {
        if (!err) {
          resolve(result);
        } else {
          reject({ reason: 'Unable to execute command' });
        }
      });
    });
  }
}
