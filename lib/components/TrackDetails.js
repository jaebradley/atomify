'use babel';

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

const TrackDetails = React.createClass({
  propTypes: {
    song: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    songDuration: PropTypes.number.isRequired,
    songPosition: PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      song: '',
      album: '',
      artist: '',
      songDuration: 0,
      songPosition: 0,
    };
  },

  formatDuration(duration) {
    // Hacky as fuck - I hate this...
    return moment.utc(duration).format("m:ss");
  },

  render() {
    return (
      <marquee id={ "atomify-track-details" }>
        { this.props.song } by { this.props.artist } from { this.props.album } { this.formatDuration(this.props.songPosition) } / { this.formatDuration(this.props.songDuration) }
      </marquee>
    );
  },
});

export default TrackDetails;
