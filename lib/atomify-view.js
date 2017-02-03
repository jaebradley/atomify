'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';

import DisplayBuilder from './services/DisplayBuilder';
import SpotifyClient from './services/SpotifyClient';

export default class AtomifyView {

  constructor(statusBar) {
    this.statusBar = statusBar;
    this.subscriptions = new CompositeDisposable();
  }

  start() {
    this.drawElement();
    this.initialize();
    setInterval( (() => this.getDisplay()), 3000);
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-clock:toggle': () => this.toggle()
    }));
  }

  drawElement() {
    this.element = document.createElement('marquee')
    this.element.id = 'atomify'
    this.element.className = 'inline-block'
    this.statusBar.addRightTile({
      item: this.element,
      priority: -10
    })
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getDisplay() {
    return SpotifyClient.getSong()
                        .then(details => {
                          this.element.innerHTML = DisplayBuilder.build(details);
                        });
  }
}
