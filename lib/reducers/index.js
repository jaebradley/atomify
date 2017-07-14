'use babel';

import { combineReducers } from 'redux';
import CurrentTrackDetails from './CurrentTrackDetails';
import CurrentPlayerDetails from './CurrentPlayerDetails';
import CurrentDisplaySettings from './CurrentDisplaySettings';
import CurrentSpotifyState from './CurrentSpotifyState';

const Atomify = combineReducers({
  CurrentTrackDetails,
  CurrentPlayerDetails,
  CurrentDisplaySettings,
  CurrentSpotifyState,
});

export default Atomify;
