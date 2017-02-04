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
    this.isToggled = false;
  }

  start() {
    this.drawElement();
    this.initialize();
    this.poll();
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggle': () => this.toggle()
    }));
  }

  drawElement() {
    this.element = document.createElement('div');
    this.element.id = 'atomify';
    this.element.className = 'inline-block';

    let spotifySettings = document.createElement('span');
    spotifySettings.id = 'spotify-settings-details';
    spotifySettings.className = 'inline-block';
    this.element.appendChild(spotifySettings);

    let spotifyMusicDetails = document.createElement('marquee');
    spotifyMusicDetails.id = 'spotify-music-details';
    spotifyMusicDetails.className = 'spotify-music-details';
    this.element.appendChild(spotifyMusicDetails);

    this.statusBar.addRightTile({
      item: this.element,
      priority: -10
    })
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  toggle() {
    style = this.element.style.display;
    this.element.style.display = style === 'none' ? '' : 'none';
    this.isToggled = !this.isToggled;
  }

  poll() {
    if (!this.isToggled) {
      setInterval( (() => this.getDisplay()), 1000);
    }
  }

  getDisplay() {
    return SpotifyClient.getStateDetails()
                        .then(details => {
                          let spotifyMusicDetails = document.getElementById('spotify-music-details');
                          spotifyMusicDetails.innerHTML = DisplayBuilder.buildMusicDetails(details);

                          let spotifySettingsDetails = document.getElementById('spotify-settings-details');
                          spotifySettingsDetails.innerHTML = DisplayBuilder.buildSettingsDetails(details);
                        });
  }
}
