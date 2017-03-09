'use es6';

import { Record } from 'immutable';

const defaults = {
  settings: '',
  music: ''
};

export default class Display extends Record(defaults) {
}
