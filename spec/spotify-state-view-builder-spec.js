'use babel';

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
});
