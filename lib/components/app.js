'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import CurrentTrackDetails from '../containers/CurrentTrackDetails';
import CurrentPlayerDetails from '../containers/CurrentPlayerDetails';

const App = () => (
  <div>
    <CurrentTrackDetails />
    <CurrentPlayerDetails />
  </div>
);

export default App;
