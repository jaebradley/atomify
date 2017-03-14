'use babel';

import Immutable from 'immutable';
import { List } from 'immutable';
import { PlayerState } from 'spotify-application-client';

import SpotifyStateDetails from '../lib/data/SpotifyStateDetails';
import SpotifyStateViewBuilder from '../lib/services/SpotifyStateViewBuilder';
import SpotifyStateView from '../lib/data/SpotifyStateView';

describe('Spotify State View Builder', function() {
  it('tests image tag building', function() {
    const testValue = 'jaebaebae';
    const expectedImageTag = `<img class="atomify-image" src=${testValue} />`;
    const imageTag = SpotifyStateViewBuilder.buildImageTag(testValue);
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests spotify image icon building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = SpotifyStateViewBuilder.buildSpotifyIconImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests shuffle image building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = SpotifyStateViewBuilder.buildShuffleImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests repeat image building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = SpotifyStateViewBuilder.buildRepeatImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  describe('tests player settings images building', function() {
    it('tests undefined shuffling and repeating', function() {
      const stateDetails = {};
      const settingsImages = SpotifyStateViewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(settingsImages).toEqual(List());
    });

    it('tests shuffling but not repeating', function() {
      const stateDetails = {
        isShuffling: true
      };
      const expected = List.of(SpotifyStateViewBuilder.buildShuffleImage());
      const settingsImages = SpotifyStateViewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(Immutable.is(settingsImages, expected)).toBe(true);
    });

    it('tests not shuffling but repeating', function() {
      const stateDetails = {
        isRepeating: true,
      };
      const expected = List.of(SpotifyStateViewBuilder.buildRepeatImage());
      const settingsImages = SpotifyStateViewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(Immutable.is(settingsImages, expected)).toBe(true);
    });
  });

  describe('tests player state image url fetching', function() {
    it('tests playing state', function() {
      const expected = SpotifyStateViewBuilder.getPlayingImageSource();
      const imageSource = SpotifyStateViewBuilder.getPlayerStateImageUrl(PlayerState.PLAYING);
      expect(imageSource).toEqual(expected);
    });

    it('tests paused state', function() {
      const expected = SpotifyStateViewBuilder.getPausedImageSource();
      const imageSource = SpotifyStateViewBuilder.getPlayerStateImageUrl(PlayerState.PAUSED);
      expect(imageSource).toEqual(expected);
    });

    it('throws for unexpected player state', function() {
      expect(() => SpotifyStateViewBuilder.getPlayerStateImageUrl(PlayerState.STOPPED)).toThrow(new TypeError("Unexpected player state"));
    });
  });

  describe('tests building music details', function() {
    const details = new SpotifyStateDetails({
      song: 'jae',
      artist: 'baebae',
      album: 'jae',
      songPosition: 'baebae',
      songDuration: 'hae'
    });
    const expected = 'jae | baebae | jae (baebae / hae)';
    const musicDetails = SpotifyStateViewBuilder.buildMusicDetails(details);
    expect(musicDetails).toEqual(expected);
  });
});
