'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import CurrentTrackDetails from '../containers/CurrentTrackDetails';
import CurrentPlayerDetails from '../containers/CurrentPlayerDetails';

const App = ({ shouldDisplay, isSpotifyOpen }) => {
  const displayValue = !shouldDisplay ? 'none' : null;
  return (
    <div style={ { display: displayValue } }>
      { isSpotifyOpen &&
        <CurrentPlayerDetails />
      }
      { isSpotifyOpen &&
        <CurrentTrackDetails />
      }
      { !isSpotifyOpen &&
        "Spotify is not open"
      }
    </div>
  );
};

App.propTypes = {
  shouldDisplay: PropTypes.bool,
  isSpotifyOpen: PropTypes.bool,
};

export default App;
