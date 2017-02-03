'use babel';

import AtomifyView from './atomify-view';
import { CompositeDisposable } from 'atom';

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
      'atomify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomifyView.destroy();
  },

  serialize() {
    return {
      atomifyViewState: this.atomifyView.serialize()
    };
  },

  toggle() {
    console.log('Atomify was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
