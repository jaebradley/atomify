'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import CurrentPlayerDetails from '../containers/CurrentPlayerDetails';
import CurrentTrackDetails from '../containers/CurrentTrackDetails';

const Atomify  = () => (
  <div>
    <CurrentPlayerDetails />
    <CurrentTrackDetails />
  </div>
);

export default Atomify;
