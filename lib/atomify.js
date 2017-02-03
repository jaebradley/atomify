'use babel';

import AtomifyView from './atomify-view';

export default {

  activate(state) {},

  deactivate() {
    if (this.atomifyView) {
      this.atomifyView.destroy();
    }
  },

  consumeStatusBar(statusBar) {
    this.atomifyView = new AtomifyView(statusBar);
    this.atomifyView.start();
  }
};
