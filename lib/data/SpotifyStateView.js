'use es6';

import { Record } from 'immutable';

const defaults = {
  settings: '',
  music: ''
};

export default class SpotifyStateView extends Record(defaults) {
}
