'use babel';

import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';
import SpotifyStateDetails from './data/SpotifyStateDetails';

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

  static turnOffRepeat() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_OFF_REPEAT);
  }

  static turnOnRepeat() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_ON_REPEAT);
  }

  static turnOffShuffle() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_OFF_SHUFFLE);
  }

  static turnOnShuffle() {
    return SpotifyClient.executeCommand(SpotifyCommands.TURN_ON_SHUFFLE);
  }

  static isShuffling() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_SHUFFLING);
  }

  static isRepeating() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_REPEATING);
  }

  static getStateDetails() {
    return Promise.all([SpotifyClient.getSong(), SpotifyClient.getAlbum(),
                        SpotifyClient.getArtist(), SpotifyClient.getPlayerState(),
                        SpotifyClient.getSongPosition(), SpotifyClient.getSongDuration()])
                  .then(values => {
                    new SpotifyStateDetails({
                      song: values[0],
                      album: values[1],
                      artist: values[2],
                      playerState: values[3],
                      songPosition: values[4],
                      songDuration: values[5]
                    })
                  });
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
