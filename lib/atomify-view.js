'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';
import { SpotifyApplicationClient } from 'spotify-application-client';

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
    setInterval( (() => this.poll()), 1000);
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
      'atomify:goToNextTrack': () => SpotifyApplicationClient.playNextTrack()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:goToPreviousTrack': () => SpotifyApplicationClient.playPreviousTrack()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:openSpotify': () => SpotifyApplicationClient.activateApplication()
    }));
  }

  drawElement() {
    this.element = document.createElement('div');
    this.element.id = 'atomify';

    let spotifySettings = document.createElement('span');
    spotifySettings.id = 'spotify-settings-details';
    spotifySettings.innerHTML = `<div class='wrapper'>
  <div class='time-part-wrapper'>
    <div class='time-part minutes tens'>
      <div class='digit-wrapper'>
        <span class='digit'>0</span>
        <span class='digit'>5</span>
        <span class='digit'>4</span>
        <span class='digit'>3</span>
        <span class='digit'>2</span>
        <span class='digit'>1</span>
        <span class='digit'>0</span>
      </div>
    </div>
    <div class='time-part minutes ones'>
      <div class='digit-wrapper'>
        <span class='digit'>0</span>
        <span class='digit'>9</span>
        <span class='digit'>8</span>
        <span class='digit'>7</span>
        <span class='digit'>6</span>
        <span class='digit'>5</span>
        <span class='digit'>4</span>
        <span class='digit'>3</span>
        <span class='digit'>2</span>
        <span class='digit'>1</span>
        <span class='digit'>0</span>
      </div>
    </div>
  </div>
  <div class='time-part-wrapper'>
    <div class='time-part seconds tens'>
      <div class='digit-wrapper'>
        <span class='digit'>0</span>
        <span class='digit'>5</span>
        <span class='digit'>4</span>
        <span class='digit'>3</span>
        <span class='digit'>2</span>
        <span class='digit'>1</span>
        <span class='digit'>0</span>
      </div>
    </div>
    <div class='time-part seconds ones'>
      <div class='digit-wrapper'>
        <span class='digit'>0</span>
        <span class='digit'>9</span>
        <span class='digit'>8</span>
        <span class='digit'>7</span>
        <span class='digit'>6</span>
        <span class='digit'>5</span>
        <span class='digit'>4</span>
        <span class='digit'>3</span>
        <span class='digit'>2</span>
        <span class='digit'>1</span>
        <span class='digit'>0</span>
      </div>
    </div>
  </div>
</div>`;
    this.element.appendChild(spotifySettings);

    let spotifyMusicDetails = document.createElement('marquee');
    spotifyMusicDetails.id = 'spotify-music-details';
    spotifyMusicDetails.className = 'spotify-music-details';
    this.element.appendChild(spotifyMusicDetails);

    atom.workspace.addBottomPanel({
      item: this.element,
      priority: 100
    });
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
                          // const updatedSettingsDetails = `${view.spotifyIcon} ${view.settingsDetails}`;
                          // const settingsDetails = document.getElementById('spotify-settings-details').innerHTML;
                          // // No need to make unnecessary inner html update if there's nothing to update
                          // if (settingsDetails !== updatedSettingsDetails) {
                          //   document.getElementById('spotify-settings-details').innerHTML = updatedSettingsDetails;
                          // };

                          // document.getElementById('spotify-music-details').innerHTML = view.musicDetails;
                        }).catch(e => console.log(e));
  }
}
