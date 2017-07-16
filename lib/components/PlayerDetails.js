'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import { SPOTIFY_ICON_URL, SHUFFLE_ICON_URL, REPEAT_ICON_URL, PLAYING_ICON_URL, PAUSED_ICON_URL } from '../constants/IconUrl';

const PlayerDetails = React.createClass({
  propTypes: {
    playerState: PropTypes.string.isRequired,
    isShuffling: PropTypes.bool.isRequired,
    isRepeating: PropTypes.bool.isRequired,
  },

  getDefaultProps() {
    return {
      playerState: 'playing',
      isShuffling: false,
      isRepeating: false,
    };
  },

  getStateIconSource() {
    switch (this.props.playerState) {
      case 'playing':
        return PLAYING_ICON_URL;
      case 'paused':
        return PAUSED_ICON_URL;
      default:
        return null;
    }
  },

  render() {
    const stateIconSource = this.getStateIconSource();

    return (
      <div id={ 'atomify-player-details' }>
        <img className={ 'atomify-player-icon' } src={ SPOTIFY_ICON_URL } />
        { stateIconSource != null &&
          <img className={ 'atomify-player-icon' } src={ stateIconSource } />
        }
        { this.props.isShuffling &&
          <img className={ 'atomify-player-icon' } src={ SHUFFLE_ICON_URL } />
        }
        { this.props.isRepeating &&
          <img className={ 'atomify-player-icon' } src={ REPEAT_ICON_URL } />
        }
      </div>
    );
  },
});

export default PlayerDetails;
