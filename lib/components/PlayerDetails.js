'use babel';

import React from 'react';
import PropTypes from 'prop-types';

const PlayerDetails = ({ playerState, isShuffling, isRepeating }) =>
  (
    <div id={"atomify-player-details"}>
      {playerState} | {isShuffling} | {isRepeating}
    </div>
  );

PlayerDetails.propTypes = {
  playerState: PropTypes.string.isRequired,
  isShuffling: PropTypes.bool.isRequired,
  isRepeating: PropTypes.bool.isRequired,
};

export default PlayerDetails;
