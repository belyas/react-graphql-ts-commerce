import { Dispatch } from 'redux';

import axios from '../../axios';
import { setAuthToken } from '../../utils/api';
import * as actionTypes from '../actions/actionTypes';
import * as api from '../../apis/auth';
import { IAuthRequest } from '../../types';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token: string, userId: string | null) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const authFailure = (error: string) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLoggedout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(authStart());

    try {
      const data = await api.loginAuth({ email, password });

      if (!data) {
        return dispatch(authFailure('Invalid email or password'));
      }

      const { token, userId } = data;

      dispatch(authSuccess(token, userId));

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (err) {
      dispatch(authFailure('Invalid email or password'));
    }
  };
};

export const authCheckState = () => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(authLoggedout());
    } else {
      const userId = localStorage.getItem('userId');

      // check server response
      try {
        setAuthToken(axios);
        await axios.post('/auth/checkstatus');

        dispatch(authSuccess(token, userId));
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
