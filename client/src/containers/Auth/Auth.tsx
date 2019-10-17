import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import {
  validateLoginAuth,
  validateSignupAuth,
} from '../../utils/validateAuth';
import AuthComponent from '../../components/Auth/Auth';
import { IAuthCommon, IAuthErrors } from '../../types';
import { AUTH_LOGIN, AUTH_SIGNUP } from '../../gql/queries';
import gqlClient from '../../gql/client';
import { authSuccess, IAuthSuccessPayload } from '../../store/actions';

interface IAuthProps extends RouteComponentProps {
  error?: string | undefined;
  authSuccess(token: string, userId: string | null): IAuthSuccessPayload;
}

interface IAuthState extends IAuthCommon {
  firstname: string;
  lastname: string;
}

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

  onLoginSubmitHanlder = async (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;

    event.preventDefault();
    const { data } = await gqlClient.mutate({
      mutation: AUTH_LOGIN,
      variables: {
        email,
        password,
      },
    });
    const {
      authLogin: { token, userId, error },
    } = data;

    if (token && userId && error === null) {
      const { authSuccess, history } = this.props;
      localStorage.setItem('user:token', token);
      localStorage.setItem('user:userId', userId);

      authSuccess(token, userId);

      history.push('/');
    } else {
      this.setState({ error });
    }
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

  _hasErrors = (): boolean => {
    const { email, password, firstname, lastname } = this.state;

    return (
      email === '' && password === '' && firstname === '' && lastname === ''
    );
  };

  onSignupSubmitHanlder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, firstname, lastname } = this.state;

    if (this._hasErrors()) {
      this.setState({
        error: 'Please correct all errors before you continue!',
      });
    } else {
      // Sign up call
      const { data } = await gqlClient.mutate({
        mutation: AUTH_SIGNUP,
        variables: {
          firstname,
          lastname,
          email,
          password,
        },
      });
      const {
        authSignup: { error, success },
      } = data;

      if (success) {
        // back to Login view
        this.setState({ error: '', isLogin: true });
      } else {
        this.setState({ error });
      }
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ authSuccess }, dispatch);

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Auth)
);
