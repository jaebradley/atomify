'use babel';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { SpotifyApplicationClient } from 'spotify-application-client';

import Atomify from '../reducers/';
import App from './app';
import { updateTrackDetails, updatePlayerDetails } from '../actions';

const store = createStore(Atomify);

export function render(target: HTMLElement) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    target
  );
}

let root = null;
const rootName = 'Atomify';

export function unmount() {
  ReactDOM.unmountComponentAtNode(root);
}

export function initRoot(): HTMLElement {
  root = document.createElement('div');
  root.setAttribute('id', rootName);
  root.hidden = false;
  return root;
}

export function togglePanel() {
  root.hidden = !root.hidden;
}

export function fetchTrackDetails() {
  return SpotifyApplicationClient.getTrackDetails()
    .then((trackDetails) => store.dispatch(updateTrackDetails(trackDetails.name, trackDetails.albumName, trackDetails.artistName, trackDetails.durationInMilliseconds)));
}

export function fetchPlayerDetails() {
  return SpotifyApplicationClient.getPlayerDetails()
    .then((details) => store.dispatch(updatePlayerDetails(details.state.value, details.positionInSeconds * 1000, details.isShuffling, details.isRepeating)));
}
