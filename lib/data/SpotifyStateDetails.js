'use babel';

import {Record} from 'immutable';

import PlayerState from './PlayerState';

const defaults = {
  song: '',
  album: '',
  artist: '',
  playerState: PlayerState.PLAYING,
  songPosition: '',
  songDuration: ''
};

export default class SpotifyStateDetails extends Record(defaults) {}
