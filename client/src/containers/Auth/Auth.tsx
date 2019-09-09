import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  validateLoginAuth,
  validateSignupAuth,
} from '../../utils/validateAuth';
import { auth, signupAuthRequest } from '../../store/actions';
import AuthComponent from '../../components/Auth/Auth';
import {
  IAuthState,
  IAuthErrors,
  IAuthProps,
  IAuthReducerInitialState,
} from '../../types';

type ThunkDispatcher = ThunkDispatch<{}, undefined, Action>;

class Auth extends Component<IAuthProps, IAuthState> {
  errrosObj: IAuthErrors = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  };
  state: IAuthState = {
    isLogin: true,
    errors: this.errrosObj,
    error: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  toggleLoginHandler = () => {
    this.setState((prevState: IAuthState) => {
      return {
        isLogin: !prevState.isLogin,
        error: '',
        errors: this.errrosObj,
      };
    });
  };

  onLoginSubmitHanlder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as Pick<unknown, keyof unknown>);
  };

  onBlurHandler = () => {
    let validationErrors: IAuthErrors;
    const { email, password, firstname, lastname } = this.state;

    if (this.state.isLogin) {
      validationErrors = validateLoginAuth({ email, password });
    } else {
      validationErrors = validateSignupAuth({
        email,
        password,
        firstname,
        lastname,
      });
    }

    this.setState({
      errors: validationErrors,
    });
  };

  onSignupSubmitHanlder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, firstname, lastname, errors } = this.state;

    if (errors && Object.keys(errors).length > 0) {
      this.setState({
        error: 'Please correct all errors before you continue!',
      });
    } else {
      // Sign up call
      this.props.onSignupAuth(firstname, lastname, email, password);
      this.setState({ error: '' });
    }
  };

  render() {
    const props = {
      ...this.props,
      ...this.state,
      error: this.state.error ? this.state.error : this.props.error,
    };
    return (
      <AuthComponent
        {...props}
        toggleLoginHandler={this.toggleLoginHandler}
        loginSubmitHanlder={this.onLoginSubmitHanlder}
        changeHandler={this.onChangeHandler}
        blurHandler={this.onBlurHandler}
        signupSubmitHanlder={this.onSignupSubmitHanlder}
      />
    );
  }
}

const mapStateToProps = (state: { auth: IAuthReducerInitialState }) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    signupSuccess: state.auth.signupSuccess,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatcher) => {
  return {
    onAuth: (email: string, password: string) => {},
    onSignupAuth: () => {},
  };
};

export default connect(mapStateToProps)(Auth);
