'use babel';

const CurrentSpotifyState = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SPOTIFY_IS_OPEN':
      return {
        isSpotifyOpen: action.isSpotifyOpen,
      }
    default:
      return state;
  }
};

export default CurrentSpotifyState;
