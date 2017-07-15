'use babel';

import * as React from 'react';
import { SpotifyApplicationClient } from 'spotify-application-client';

import { render, initRoot, togglePanel, fetchDetails } from '../components/Render';
import { onActivate, onDeactivate } from './Subscriptions';

class Main {
  constructor() {
    this.root = initRoot();
  }

  consumeStatusBar(statusBar) {
    statusBar.addRightTile({
      item: this.root,
      priority: -100
    });

    onActivate();

    render(this.root);

    setInterval(() => this.poll(), 1000);
  }

  deactivate() {
    onDeactivate();
  }

  toggle() {
    togglePanel();
  }

  poll() {
    if (!this.root.hidden) {
      return fetchDetails();
    }
  }
};

export default new Main();
