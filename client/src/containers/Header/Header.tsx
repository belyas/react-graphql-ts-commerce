import { connect } from 'react-redux';

import Header from '../../components/Header/Header';

const mapStateToProps = () => {
  return {
    isAuthenticated: false,
  };
};

export default connect(mapStateToProps)(Header);
