'use babel';

export const updateTrackDetails = (song, album, artist, songDuration) => {
  return {
    type: 'UPDATE_TRACK_DETAILS',
    song,
    album,
    artist,
    songDuration,
  };
};

export const updatePlayerDetails = (playerState, songPosition, isShuffling, isRepeating) => {
  return {
    type: 'UPDATE_PLAYER_DETAILS',
    playerState,
    songPosition,
    isShuffling,
    isRepeating,
  };
};

export const updateDisplaySettings = (shouldDisplay) => {
  return {
    type: 'UPDATE_DISPLAY_SETTINGS',
    shouldDisplay,
  };
};

export const updateSpotifyIsOpen = (isSpotifyOpen) => {
  return {
    type: 'UPDATE_SPOTIFY_IS_OPEN',
    isSpotifyOpen,
  };
};
