import {
  AUTHENTICATION_COMPLETE,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_USER_FETCHED
} from '../constants/actionTypes';

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  credentials: {},
  currentUser: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };
    case AUTHENTICATION_LOGIN_SUCCESS:
      return {
        ...state,
        credentials: action.credentials,
      };
    default:
      return state;
  }
}