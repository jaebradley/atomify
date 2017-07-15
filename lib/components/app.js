'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import CurrentTrackDetails from '../containers/CurrentTrackDetails';
import CurrentPlayerDetails from '../containers/CurrentPlayerDetails';

import { SPOTIFY_ICON_URL } from '../constants/IconUrl';

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
         <div>
           <img className={ 'atomify-player-icon' } src={ SPOTIFY_ICON_URL } />Spotify is not open
         </div>
      }
    </div>
  );
};

App.propTypes = {
  shouldDisplay: PropTypes.bool,
  isSpotifyOpen: PropTypes.bool,
};

export default App;
