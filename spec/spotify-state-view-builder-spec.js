'use babel';

import Immutable from 'immutable';
import { List } from 'immutable';
import { PlayerState } from 'spotify-application-client';

import SpotifyStateDetails from '../lib/data/SpotifyStateDetails';
import SpotifyStateViewBuilder from '../lib/services/SpotifyStateViewBuilder';
import SpotifyStateView from '../lib/data/SpotifyStateView';

describe('Spotify State View Builder', function() {
  const viewBuilder = new SpotifyStateViewBuilder();

  it('tests image tag building', function() {
    const testValue = 'jaebaebae';
    const expectedImageTag = `<img class="atomify-image" src=${testValue} />`;
    const imageTag = viewBuilder.buildImageTag(testValue);
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests spotify image icon building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/spotify.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = viewBuilder.buildSpotifyIconImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests shuffle image building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/shuffle.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = viewBuilder.buildShuffleImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  it('tests repeat image building', function() {
    const imageUrl = "https://raw.githubusercontent.com/jaebradley/atomify/master/images/repeat.png?raw=true";
    const expectedImageTag = `<img class="atomify-image" src=${imageUrl} />`;
    const imageTag = viewBuilder.buildRepeatImage();
    expect(imageTag).toEqual(expectedImageTag);
  });

  describe('tests player settings images building', function() {
    const viewBuilder = new SpotifyStateViewBuilder();

    it('tests undefined shuffling and repeating', function() {
      const stateDetails = {};
      const settingsImages = viewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(settingsImages).toEqual(List());
    });

    it('tests shuffling but not repeating', function() {
      const stateDetails = {
        isShuffling: true
      };
      const expected = List.of(viewBuilder.buildShuffleImage());
      const settingsImages = viewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(Immutable.is(settingsImages, expected)).toBe(true);
    });

    it('tests not shuffling but repeating', function() {
      const stateDetails = {
        isRepeating: true,
      };
      const expected = List.of(viewBuilder.buildRepeatImage());
      const settingsImages = viewBuilder.buildPlayerSettingsImages(stateDetails);
      expect(Immutable.is(settingsImages, expected)).toBe(true);
    });
  });

  describe('tests player state image url fetching', function() {
    const viewBuilder = new SpotifyStateViewBuilder();

    it('tests playing state', function() {
      const expected = viewBuilder.getPlayingImageSource();
      const imageSource = viewBuilder.getPlayerStateImageUrl(PlayerState.PLAYING);
      expect(imageSource).toEqual(expected);
    });

    it('tests paused state', function() {
      const expected = viewBuilder.getPausedImageSource();
      const imageSource = viewBuilder.getPlayerStateImageUrl(PlayerState.PAUSED);
      expect(imageSource).toEqual(expected);
    });

    it('throws for unexpected player state', function() {
      expect(() => viewBuilder.getPlayerStateImageUrl(PlayerState.STOPPED)).toThrow(new TypeError("Unexpected player state"));
    });
  });

  describe('tests building music details', function() {
    const viewBuilder = new SpotifyStateViewBuilder();
    const details = {
      song: 'jae',
      artist: 'baebae',
      album: 'jae',
      songPosition: 'baebae',
      songDuration: 'hae'
    };
    const expected = 'jae | baebae | jae (baebae / hae)';
    const musicDetails = viewBuilder.buildMusicDetails(details);
    expect(musicDetails).toEqual(expected);
  });

  describe('tests building player state image', function() {
    const viewBuilder = new SpotifyStateViewBuilder();
    const imageTagValue = "foo";

    viewBuilder.buildImageTag = jasmine.createSpy('build-image-tag-spy').andCallFake(function(value) {
      return imageTagValue;
    });
    viewBuilder.getPlayerStateImageUrl = jasmine.createSpy('player-state-image-url-spy').andCallFake(function(state) {
      return state;
    });

    it('calculates player state image', function() {
      const calculatedValue = viewBuilder.buildPlayerStateImage('baz');

      expect(viewBuilder.buildImageTag).toHaveBeenCalled();
      expect(viewBuilder.getPlayerStateImageUrl).toHaveBeenCalled();
      expect(calculatedValue).toEqual(imageTagValue);
    });
  });

  describe('tests building player settings details', function() {
    describe('tests empty images', function() {
      const viewBuilder = new SpotifyStateViewBuilder();
      const imageValue = 'foo';

      viewBuilder.buildPlayerStateImage = jasmine.createSpy('build-player-state-image-spy').andCallFake(function(value) {
        return imageValue;
      });

      viewBuilder.buildPlayerSettingsImages = jasmine.createSpy('build-player-settings-image-spy').andCallFake(function(value) {
        return List();
      });

      it('calculates player settings details with empty images', function() {
        const calculated = viewBuilder.buildPlayerSettingsDetails('bar');

        expect(viewBuilder.buildPlayerStateImage).toHaveBeenCalled();
        expect(viewBuilder.buildPlayerSettingsImages).toHaveBeenCalled();
        expect(calculated).toEqual(imageValue);
      });
    });

    describe('tests non-empty images', function() {
      const viewBuilder = new SpotifyStateViewBuilder();
      const imageValue = 'foo';

      viewBuilder.buildPlayerStateImage = jasmine.createSpy('build-player-state-image-spy').andCallFake(function(value) {
        return imageValue;
      });

      viewBuilder.buildPlayerSettingsImages = jasmine.createSpy('build-player-settings-image-spy').andCallFake(function(value) {
        return List.of('baz', 'jae');
      });

      it('calculates player settings details with non-empty images', function() {
        const expected = `${imageValue} baz jae`;
        const calculated = viewBuilder.buildPlayerSettingsDetails('bar');

        expect(viewBuilder.buildPlayerStateImage).toHaveBeenCalled();
        expect(viewBuilder.buildPlayerSettingsImages).toHaveBeenCalled();
        expect(calculated).toEqual(expected);
      });
    });
  });
});
