'use babel';

import osascript from 'node-osascript';

import SpotifyCommands from '../data/SpotifyCommands';
import SpotifyStateDetails from '../data/SpotifyStateDetails';
import PlayerState from '../data/PlayerState';

export default class SpotifyClient {
  static isSpotifyRunning() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_SPOTIFY_RUNNING);
  }

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

  static toggleShuffle() {
    return SpotifyClient.isShuffling()
                        .then(isShuffling => {
                          if (isShuffling) {
                            return SpotifyClient.turnOffShuffle();
                          } else {
                            return SpotifyClient.turnOnShuffle();
                          }
                        });
  }

  static isRepeating() {
    return SpotifyClient.executeCommand(SpotifyCommands.IS_REPEATING);
  }

  static togglePlayPause() {
    return SpotifyClient.executeCommand(SpotifyCommands.TOGGLE_PLAY_PAUSE);
  }

  static goToNextTrack() {
    return SpotifyClient.executeCommand(SpotifyCommands.GO_TO_NEXT_TRACK);
  }

  static goToPreviousTrack() {
    return SpotifyClient.executeCommand(SpotifyCommands.GO_TO_PREVIOUS_TRACK);
  }

  static getStateDetails() {
    return Promise.all([SpotifyClient.getSong(), SpotifyClient.getAlbum(),
                        SpotifyClient.getArtist(), SpotifyClient.getPlayerState(),
                        SpotifyClient.getSongPosition(), SpotifyClient.getSongDuration(),
                        SpotifyClient.isShuffling(), SpotifyClient.isRepeating()])
                  .then(([song, album, artist, playerState, songPosition,
                         songDuration, isShuffling, isRepeating]) => {
                    const stateDetails = new SpotifyStateDetails({
                      song: song,
                      album: album,
                      artist: artist,
                      playerState: playerState,
                      songPosition: songPosition,
                      songDuration: songDuration,
                      isShuffling: isShuffling,
                      isRepeating: isRepeating
                    });
                    return new Promise((resolve, reject) => {
                      resolve(stateDetails);
                    });
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

  static valueOfPlayerState(value) {
    for (const state of PlayerState.enumValues) {
      if (state.value == value) {
        return state;
      }
    }

    throw Error('Unable to identify state');
  }
}
