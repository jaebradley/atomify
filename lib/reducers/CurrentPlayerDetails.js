'use babel';

import { UPDATE_PLAYER_DETAILS } from '../constants/ActionType';

const CurrentPlayerDetails = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_DETAILS:
      return {
        playerState: action.playerState,
        songPosition: action.songPosition,
        isShuffling: action.isShuffling,
        isRepeating: action.isRepeating,
      }
    default:
      return state;
  }
};

export default CurrentPlayerDetails;
