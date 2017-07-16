'use babel';

import { UPDATE_DISPLAY_SETTINGS } from '../constants/ActionType';

const CurrentDisplaySettings = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DISPLAY_SETTINGS:
      return {
        shouldDisplay: action.shouldDisplay,
      }
    default:
      return state;
  }
};

export default CurrentDisplaySettings;
