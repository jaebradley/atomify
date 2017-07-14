'use babel';

import * as React from 'react';
import { SpotifyApplicationClient } from 'spotify-application-client';

import { render, initRoot, togglePanel, fetchTrackDetails, fetchPlayerDetails } from '../components/render';
import { onActivate, onDeactivate } from './subscriptions';

class Main {
  constructor() {
    this.root = initRoot();
  }

  consumeStatusBar(statusBar) {
    // 1. create atom panel
    statusBar.addRightTile({
      item: this.root,
      priority: 100
    });
    // 2. initiate subscriptions
    onActivate();
    // 3. render React component
    render(this.root);

    setInterval(() => Promise.all([fetchTrackDetails(), fetchPlayerDetails()]), 1000);
  }

  deactivate() {
    // remove subscriptions & unmount react app
    onDeactivate();
  }

  toggle() {
    togglePanel();
  }
};

export default new Main();
