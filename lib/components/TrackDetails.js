'use babel';

import React from 'react';
import PropTypes from 'prop-types';

const TrackDetails = ({ song, album, artist, songDuration, songPosition }) =>
  (
    <div id={"atomify-track-details"}>
      {song} | {album} | {artist} | {songDuration} | {songPosition}
    </div>
  );

TrackDetails.propTypes = {
  song: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  songDuration: PropTypes.number.isRequired,
  songPosition: PropTypes.number.isRequired,
};

export default TrackDetails;
