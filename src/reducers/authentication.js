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
      case AUTHENTICATION_USER_FETCHED:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case AUTHENTICATION_COMPLETE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        credentials: {},
      };
    case AUTHENTICATION_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        credentials: {},
      };
    default:
      return state;
  }
}