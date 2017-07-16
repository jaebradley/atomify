'use babel';

import { connect } from 'react-redux'
import TrackDetails from '../components/TrackDetails'

const mapStateToProps = (state) => {
  return {
    song: state.CurrentTrackDetails.song,
    album: state.CurrentTrackDetails.album,
    artist: state.CurrentTrackDetails.artist,
    songDuration: state.CurrentTrackDetails.songDuration,
    songPosition: state.CurrentPlayerDetails.songPosition,
  }
};

const CurrentTrackDetails = connect(
  mapStateToProps
)(TrackDetails);

export default CurrentTrackDetails;
