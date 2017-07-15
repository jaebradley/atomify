'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import CurrentTrackDetails from '../containers/CurrentTrackDetails';
import CurrentPlayerDetails from '../containers/CurrentPlayerDetails';

import { SPOTIFY_ICON_URL } from '../constants/IconUrl';

const App = React.createClass({
  propTypes: {
    shouldDisplay: PropTypes.bool,
    isSpotifyOpen: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      shouldDisplay: false,
      isSpotifyOpen: false,
    };
  },

  getDisplayValue() {
    return this.props.shouldDisplay ? null : 'none';
  },

  render() {
    return (
      <div style={ { display: this.getDisplayValue() } }>
        { this.props.isSpotifyOpen &&
          <CurrentPlayerDetails />
        }
        { this.props.isSpotifyOpen &&
          <CurrentTrackDetails />
        }
        { !this.props.isSpotifyOpen &&
           <div>
             <img className={ 'atomify-player-icon' } src={ SPOTIFY_ICON_URL } />Spotify is not open
           </div>
        }
      </div>
    );
  },
});

export default App;
