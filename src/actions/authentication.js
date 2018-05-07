import {
  AUTHENTICATION_COMPLETE,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOGOUT,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_USER_FETCHED,
} from '../constants/actionTypes';

import client from '../services/client';

import {
  authenticate,
  fetchUser
} from '../services/authentication';

export const authenticationLogIn = (login, password) => (dispatch) => {
  dispatch({
    type: AUTHENTICATION_REQUEST,
  });

  return authenticate(login, password)
    .then((credentials) => {
      client.setCredentials(credentials);

      dispatch({
        type: AUTHENTICATION_LOGIN_SUCCESS,
        type: AUTHENTICATION_COMPLETE,
        credentials,
      });

      return fetchUser(credentials.data.userId);
    })
    .catch((err) => {
      dispatch({
        type: AUTHENTICATION_FAILURE,
        error: err.message,
      });
    });
};

export const authenticationLogOut = () => (dispatch) => {
  dispatch({
    type: AUTHENTICATION_LOGOUT,
  });
};
