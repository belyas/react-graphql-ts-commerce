import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';
import { IAuthReducerInitialState } from '../../types';

interface AuthAction {
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  signupSuccess: boolean;
  type: string;
  payload: { error: string };
}

export const initialState: IAuthReducerInitialState = {
  token: '',
  userId: '',
  error: '',
  loading: false,
  signupSuccess: false,
};

const authStart = (state: IAuthReducerInitialState) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state: IAuthReducerInitialState, action: AuthAction) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    userId: action.userId,
  });
};

const authFail = (state: IAuthReducerInitialState, action: AuthAction) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authLoggedout = (state: IAuthReducerInitialState) => {
  return updateObject(state, {
    token: '',
    userId: '',
  });
};

const signupStartAuth = (state: IAuthReducerInitialState) => {
  return updateObject(state, { loading: true });
};

const signupFailAuth = (
  state: IAuthReducerInitialState,
  action: AuthAction
) => {
  return updateObject(state, { error: action.payload.error, loading: false });
};

const signupSuccessAuth = (state: IAuthReducerInitialState) => {
  return updateObject(state, {
    loading: false,
    error: null,
    signupSuccess: true,
  });
};

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLoggedout(state);
    case actionTypes.AUTH_SIGNUP_START:
      return signupStartAuth(state);
    case actionTypes.AUTH_SIGNUP_FAIL:
      return signupFailAuth(state, action);
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return signupSuccessAuth(state);
    default:
      return state;
  }
};

export default reducer;
