import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';

import { authLoggedout } from '../../store/actions';

type IProps = { authLoggedout: () => void };

const Logout = ({ authLoggedout }: IProps) => {
  useEffect(() => {
    authLoggedout();
    // eslint-disable-next-line
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ authLoggedout }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Logout);
