'use babel';

const CurrentTrackDetails = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TRACK_DETAILS':
      return {
        song: action.song,
        album: action.album,
        artist: action.artist,
        songDuration: action.songDuration,
      }
    default:
      return state;
  }
};

export default CurrentTrackDetails;
