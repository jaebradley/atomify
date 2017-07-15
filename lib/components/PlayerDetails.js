'use babel';

import React from 'react';
import PropTypes from 'prop-types';

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

  getSpotifyIconSource() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true';
  },

  getShuffleIconSource() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true';
  },

  getRepeatIconSource() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true';
  },

  getPlayingIconSource() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true';
  },

  getPausedIconSource() {
    return 'https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true';
  },

  getStateIconSource() {
    switch (this.props.playerState) {
      case 'playing':
        return this.getPlayingIconSource();
      case 'paused':
        return this.getPausedIconSource();
      default:
        return null;
    }
  },

  render() {
    const stateIconSource = this.getStateIconSource();

    return (
      <div id={ 'atomify-player-details' }>
        <img className={ 'atomify-player-icon' } src={ this.getSpotifyIconSource() } />
        { stateIconSource != null &&
          <img className={ 'atomify-player-icon' } src={ stateIconSource } />
        }
        { this.props.isShuffling &&
          <img className={ 'atomify-player-icon' } src={ this.getShuffleIconSource() } />
        }
        { this.props.isRepeating &&
          <img className={ 'atomify-player-icon' } src={ this.getRepeatIconSource() } />
        }
      </div>
    );
  },
});

export default PlayerDetails;
