import { combineReducers } from 'redux';

import authentication from './authentication';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  rehydrated,
  authentication
});

export default rootReducer;