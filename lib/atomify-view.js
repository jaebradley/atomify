'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';

import DisplayBuilder from './services/DisplayBuilder';
import SpotifyClient from './services/SpotifyClient';
import SpotifyPoller from './services/SpotifyPoller';

export default class AtomifyView {

  constructor(statusBar) {
    this.statusBar = statusBar;
    this.subscriptions = new CompositeDisposable();
    this.isToggled = false;
  }

  start() {
    this.drawElement();
    this.initialize();
    setInterval( (() => this.poll()), 1000);
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggle': () => this.toggle()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggleShuffle': () => SpotifyClient.toggleShuffle()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggleRepeat': () => SpotifyClient.toggleRepeating()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:togglePlayPause': () => SpotifyClient.togglePlayPause()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:goToNextTrack': () => SpotifyClient.goToNextTrack()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:goToPreviousTrack': () => SpotifyClient.goToPreviousTrack()
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
    this.isToggled = style === 'none';
    this.element.style.display = style === 'none' ? '' : 'none';
  }

  poll() {
    return SpotifyPoller.getDisplayFields(this.isToggled)
                        .then( ([musicDetails, settingsDetails]) => {
                          let spotifyMusicDetails = document.getElementById('spotify-music-details');
                          let spotifySettingsDetails = document.getElementById('spotify-settings-details');
                          spotifyMusicDetails.innerHTML = musicDetails;
                          spotifySettingsDetails.innerHTML = settingsDetails;
                        }).catch(e => {
                          console.log(e);
                        });
  }
}
