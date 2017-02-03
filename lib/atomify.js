'use babel';

import AtomifyView from './atomify-view';
import { CompositeDisposable } from 'atom';
let osascript = require('node-osascript');

import SpotifyCommands from './data/SpotifyCommands';

export default {

  atomifyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomifyView = new AtomifyView(state.atomifyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomifyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomify:buildSpotifyStatus': () => this.buildSpotifyStatus()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomifyView.destroy();
  },

  executeSpotifyCommand(command) {
    osascript.execute(command, function(err, result, raw) {
      if (err) {
        throw Error('Unable to execute command');
      }

      return result;
    })
  },

  buildSpotifyStatus() {
    let state = this.executeSpotifyCommand(SpotifyCommands.GET_STATE.value);
    let song = this.executeSpotifyCommand(SpotifyCommands.GET_SONG.value);
    let artist = this.executeSpotifyCommand(SpotifyCommands.GET_ARTIST.value);
    let album = this.executeSpotifyCommand(SpotifyCommands.GET_ALBUM.value);
    let position = this.executeSpotifyCommand(SpotifyCommands.GET_POSITION.value);
    let duration = this.executeSpotifyCommand(SpotifyCommands.GET_DURATION.value);
    console.log(this.formatSpotifyStatus(state, song, artist, album, position, duration));
  },

  formatSpotifyStatus(state, song, artist, album, position, duration) {
    return `${state} ${song} by ${artist} from ${album} (${position} of ${duration})`;
  }
};
