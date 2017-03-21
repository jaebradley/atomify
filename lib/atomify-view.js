'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';
import { SpotifyApplicationClient } from 'spotify-application-client';

import DisplayBuilder from './services/DisplayBuilder';
import Poller from './services/Poller';

export default class AtomifyView {

  constructor(statusBar) {
    this.statusBar = statusBar;
    this.subscriptions = new CompositeDisposable();
    this.isToggled = false;
    this.poller = new Poller();
  }

  start() {
    this.drawElement();
    this.initialize();
    setInterval( (() => this.poll()), 5000);
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggle': () => this.toggle()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggleShuffle': () => SpotifyApplicationClient.toggleShuffle()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:toggleRepeat': () => SpotifyApplicationClient.toggleRepeat()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:togglePlayPause': () => SpotifyApplicationClient.togglePlayPause()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:goToNextTrack': () => SpotifyApplicationClient.goToNextTrack()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:goToPreviousTrack': () => SpotifyApplicationClient.goToPreviousTrack()
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
      priority:100
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
    return this.poller.getDisplayFields(this.isToggled)
                        .then( view => {
                          document.getElementById('spotify-music-details').innerHTML = view.musicDetails;
                          document.getElementById('spotify-settings-details').innerHTML = `${view.spotifyIcon} ${view.settingsDetails}`;
                        }).catch(e => console.log(e));
  }
}
