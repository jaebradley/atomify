'use babel';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { SpotifyApplicationClient } from 'spotify-application-client';

import Atomify from '../reducers/';
import CurrentApp from '../containers/CurrentApp';
import { updateTrackDetails, updatePlayerDetails, updateDisplaySettings, updateSpotifyIsOpen } from '../actions';

const store = createStore(Atomify);

export function render(target: HTMLElement) {
  ReactDOM.render(
    <Provider store={store}>
      <CurrentApp />
    </Provider>,
    target
  );
}

let root = null;
const rootName = 'atomify';

export function unmount() {
  ReactDOM.unmountComponentAtNode(root);
}

export function initRoot(): HTMLElement {
  root = document.createElement('div');
  root.setAttribute('id', rootName);
  root.hidden = false;
  store.dispatch(updateDisplaySettings(!root.hidden));
  return root;
}

export function togglePanel() {
  root.hidden = !root.hidden;
  store.dispatch(updateDisplaySettings(root.hidden));
}

export function fetchDetails() {
  return SpotifyApplicationClient.isSpotifyRunning()
    .then(isSpotifyRunning => {
      store.dispatch(updateSpotifyIsOpen(isSpotifyRunning));
      if (isSpotifyRunning) {
        return Promise.all([fetchTrackDetails(), fetchPlayerDetails()]);
      }

      return Promise.resolve('Spotify is not running');
    }).catch(e => console.error(`Error when fetching Spotify Player Information: ${JSON.stringify(e)}`));
}

export function fetchTrackDetails() {
  return SpotifyApplicationClient.getTrackDetails()
    .then((trackDetails) => store.dispatch(updateTrackDetails(trackDetails.name, trackDetails.albumName, trackDetails.artistName, trackDetails.durationInMilliseconds)));
}

export function fetchPlayerDetails() {
  return SpotifyApplicationClient.getPlayerDetails()
    .then((details) => store.dispatch(updatePlayerDetails(details.state.value, details.positionInSeconds * 1000, details.isShuffling, details.isRepeating)));
}
