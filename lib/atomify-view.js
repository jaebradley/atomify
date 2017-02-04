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
    this.isSpotifyRunning = false;
  }

  start() {
    this.isToggled = false;
    this.drawElement();
    this.initialize();
    setInterval( (() => this.poll()), 1000);
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

  hide() {
    this.element.style.display = 'none';
    this.isToggled = true;
  }

  toggle() {
    style = this.element.style.display;
    this.isToggled = style === 'none' ? '' : 'none';
    this.element.style.display = style === 'none' ? '' : 'none';
  }

  poll() {
    return SpotifyClient.isSpotifyRunning()
                 .then(isSpotifyRunning => {
                   let oldState = this.isSpotifyRunning;
                   this.isSpotifyRunning = isSpotifyRunning;
                   if (!oldState && !this.isSpotifyRunning) {
                     console.log('Spotify was not running and is not running');
                     this.hide();
                   } else if (oldState && !isSpotifyRunning) {
                     this.hide();
                   } else if (!oldState && isSpotifyRunning) {
                     this.start();
                   } else {
                     if (!this.isToggled) {
                       this.getDisplay();
                     }
                   }
                 }).catch(e => {
                   console.log(e);
                   this.hide();
                 });
  }

  getDisplay() {
    return SpotifyClient.getStateDetails()
                        .then(details => {
                          let spotifyMusicDetails = document.getElementById('spotify-music-details');
                          spotifyMusicDetails.innerHTML = DisplayBuilder.buildMusicDetails(details);

                          let spotifySettingsDetails = document.getElementById('spotify-settings-details');
                          spotifySettingsDetails.innerHTML = DisplayBuilder.buildSettingsDetails(details);
                        }).catch(e => {
                          console.log(e);
                          this.hide();
                        });
  }
}
