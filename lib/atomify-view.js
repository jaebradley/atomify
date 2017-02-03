'use babel';

import { CompositeDisposable } from 'atom';
import osascript from 'node-osascript';

import SpotifyCommands from './data/SpotifyCommands';

export default class AtomifyView {

  constructor(statusBar) {
    this.statusBar = statusBar
    this.subscriptions = new CompositeDisposable()
  }

  start() {
    this.drawElement();
    this.initialize();
    setInterval( (() => this.buildSpotifyStatus().then(value => this.element.firstChild.textContent = value)), 1000);
  }

  initialize() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-clock:toggle': () => this.toggle()
    }));
  }

  drawElement() {
    this.element = document.createElement('div')
    this.element.id = 'atomify'
    this.element.className = 'inline-block'
    this.element.appendChild(document.createElement('marquee'))

    this.statusBar.addRightTile({
      item: this.element,
      priority: -10
    })
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    this.element.parentNode.removeChild(this.element);
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

  buildSpotifyStatus() {
    let state = this.executeSpotifyCommand(SpotifyCommands.GET_STATE.value);
    let song = this.executeSpotifyCommand(SpotifyCommands.GET_SONG.value);
    let artist = this.executeSpotifyCommand(SpotifyCommands.GET_ARTIST.value);
    let album = this.executeSpotifyCommand(SpotifyCommands.GET_ALBUM.value);
    let position = this.executeSpotifyCommand(SpotifyCommands.GET_POSITION.value);
    let duration = this.executeSpotifyCommand(SpotifyCommands.GET_DURATION.value);
    return Promise.all([state, song, artist, album, position, duration])
           .then(values =>
                 this.formatSpotifyStatus(values[0], values[1], values[2],
                                          values[3], values[4], values[5]));
  }

  formatSpotifyStatus(state, song, artist, album, position, duration) {
    return `${state} ${song} by ${artist} from ${album} (${position} of ${duration})`;
  }
}
