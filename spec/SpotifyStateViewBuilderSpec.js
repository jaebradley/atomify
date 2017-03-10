'use babel';

import SpotifyStateViewBuilder from '../lib/services/SpotifyStateViewBuilder';
import SpotifyStateView from '../lib/data/SpotifyStateView';

describe('Spotify State View Builder', function() {
  it('tests image tag building', function() {
    const testValue = 'jaebaebae';
    const expectedImageTag = `<img class="atomify-image" src=${testValue} />`;
    expect(SpotifyStateViewBuilder.buildImageTag(testValue)).to.eql(expectedImageTag);
  });
});
