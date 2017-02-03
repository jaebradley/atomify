'use babel';

import AtomifyView from './atomify-view';
import { CompositeDisposable } from 'atom';
let osascript = require('node-osascript');

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
      'atomify:identifySong': () => this.identifySong()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomifyView.destroy();
  },

  identifySong() {
    osascript.execute('tell application "Spotify" to name of current track as string', function(err, result, raw) {
      if (err) {
        return console.error(err);
      }

      console.log(result, raw)
    });
  }
};
