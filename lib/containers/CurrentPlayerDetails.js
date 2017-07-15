'use babel';

import { connect } from 'react-redux'
import PlayerDetails from '../components/PlayerDetails'

const mapStateToProps = (state) => {
  return {
    playerState: state.CurrentPlayerDetails.playerState,
    isShuffling: state.CurrentPlayerDetails.isShuffling,
    isRepeating: state.CurrentPlayerDetails.isRepeating,
  };
};

const CurrentPlayerDetails = connect(
  mapStateToProps
)(PlayerDetails);

export default CurrentPlayerDetails;
