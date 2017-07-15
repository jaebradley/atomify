'use babel';

import { CompositeDisposable } from 'atom';
import { unmount, togglePanel } from '../components/Render';

import { SpotifyApplicationClient } from 'spotify-application-client';

const subscriptions = new CompositeDisposable;

export function onActivate() {
  // Add subscriptions here
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atomify:toggle': () => togglePanel()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:toggleShuffle': () => SpotifyApplicationClient.toggleShuffle()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:toggleRepeat': () => SpotifyApplicationClient.toggleRepeat()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:togglePlayPause': () => SpotifyApplicationClient.togglePlayPause()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:goToNextTrack': () => SpotifyApplicationClient.playNextTrack()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:goToPreviousTrack': () => SpotifyApplicationClient.playPreviousTrack()
    }),
    atom.commands.add('atom-workspace', {
      'atomify:openSpotify': () => SpotifyApplicationClient.activateApplication()
    }),
  );
  return subscriptions;
}

export function onDeactivate() {
  // 1. remove window listener
  window.onresize = null;
  // 2. unmount React
  unmount();
  // 3. cleanup subscriptions
  subscriptions.dispose();
}
