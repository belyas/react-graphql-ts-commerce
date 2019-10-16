import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

export interface AuthAction {
  token: string;
  userId: string;
  error: string;
  loading: boolean;
  signupSuccess: boolean;
  type: string;
  payload: { error: string };
  isAuthenicated?: boolean;
}

export interface IAuthReducerInitialState {
  token: string;
  userId?: string;
  error?: string;
  loading?: boolean;
  signupSuccess?: boolean;
  isAuthenicated?: boolean;
}

export const initialState: IAuthReducerInitialState = {
  token: '',
  userId: '',
  error: '',
  loading: false,
  signupSuccess: false,
  isAuthenicated: false,
};

const authSuccess = (state: IAuthReducerInitialState, action: AuthAction) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    userId: action.userId,
    isAuthenicated: true,
  });
};

const authLoggedout = (state: IAuthReducerInitialState) => {
  return updateObject(state, {
    token: '',
    userId: '',
    isAuthenicated: false,
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
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
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
