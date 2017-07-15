'use babel';

import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    shouldDisplay: state.CurrentDisplaySettings.shouldDisplay,
    isSpotifyOpen: state.CurrentSpotifyState.isSpotifyOpen,
  };
};

const CurrentApp = connect(
  mapStateToProps
)(App);

export default CurrentApp;
