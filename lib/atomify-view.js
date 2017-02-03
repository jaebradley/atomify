'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';

export default class AtomifyView {

  constructor(statusBar) {
    this.statusBar = statusBar;
    this.subscriptions = new CompositeDisposable();
    this.state = null;
    this.song = null;
    this.artist = null;
    this.album = null;
    this.position = null;
    this.duration = null;
  }

  start() {
    this.drawElement();
    this.initialize();
    setInterval( (() => this.update()), 5000);
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

  executeSpotifyCommand(command) {
    return new Promise((resolve, reject) => {
      osascript.execute(command, function(err, result, raw) {
        if (!err) {
          resolve(result);
        } else {
          reject({ reason: 'Unable to execute command' });
        }
      });
    });
  }

  update() {
    let state = this.executeSpotifyCommand(SpotifyCommands.GET_STATE.value);
    let song = this.executeSpotifyCommand(SpotifyCommands.GET_SONG.value);
    let artist = this.executeSpotifyCommand(SpotifyCommands.GET_ARTIST.value);
    let album = this.executeSpotifyCommand(SpotifyCommands.GET_ALBUM.value);
    let position = this.executeSpotifyCommand(SpotifyCommands.GET_POSITION.value);
    let duration = this.executeSpotifyCommand(SpotifyCommands.GET_DURATION.value);
    return Promise.all([state, song, artist, album, position, duration])
           .then(values => {
                 this.state = values[0];
                 this.song = values[1];
                 this.artist = values[2];
                 this.album = values[3];
                 this.position = values[4];
                 this.duration = values[5]; })
           .then(() => this.formatSpotifyStatus());
  }

  formatSpotifyStatus() {
    this.element.innerHTML = `${this.identifyStateImage()} ${this.song} by ${this.artist} from ${this.album} (${this.position} of ${this.duration})`;
  }

  identifyStateImage() {
    if (this.state = 'playing') {
      return "<img src='https://raw.githubusercontent.com/jaebradley/atomify/master/images/play.png?raw=true' />";
    }

    return "<img src='https://raw.githubusercontent.com/jaebradley/atomify/master/images/pause.png?raw=true' />";
  }
}
