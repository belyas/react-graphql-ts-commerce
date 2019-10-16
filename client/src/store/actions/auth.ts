import { Dispatch } from 'redux';

import axios from '../../axios';
import { setAuthToken } from '../../utils/api';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export interface IAuthSuccessPayload {
  type: typeof actionTypes.AUTH_SUCCESS;
  token: string;
  userId: string;
}

export const authSuccess = (
  token: string,
  userId: string
): IAuthSuccessPayload => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const authFailure = (error: string) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLoggedout = () => {
  localStorage.removeItem('user:token');
  localStorage.removeItem('user:userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('user:token');

    if (!token) {
      dispatch(authLoggedout());
    } else {
      const userId = localStorage.getItem('user:userId');

      // check server response
      try {
        setAuthToken(axios);
        await axios.post('/auth/checkstatus');

        if (userId) dispatch(authSuccess(token, userId));
      } catch (err) {
        dispatch(authLoggedout());
      }
    }
  };
};

export const signupAuthRequest = (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => ({
  type: actionTypes.AUTH_SIGNUP_REQUEST,
  payload: { firstname, lastname, email, password },
});

export const signupAuthStart = () => ({
  type: actionTypes.AUTH_SIGNUP_START,
});

export const signupAuthFail = (error: string) => ({
  type: actionTypes.AUTH_SIGNUP_FAIL,
  payload: { error },
});

export const signupAuthSuccess = () => ({
  type: actionTypes.AUTH_SIGNUP_SUCCESS,
});
