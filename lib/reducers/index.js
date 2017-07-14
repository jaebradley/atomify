'use babel';

import { combineReducers } from 'redux';
import CurrentTrackDetails from './CurrentTrackDetails';
import CurrentPlayerDetails from './CurrentPlayerDetails';

const Atomify = combineReducers({
  CurrentTrackDetails,
  CurrentPlayerDetails,
});

export default Atomify;
