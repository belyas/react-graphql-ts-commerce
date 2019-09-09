import React from 'react';
import { connect } from 'react-redux';

import CartComponent from '../../components/Cart/Cart';
import { CartType } from '../../types';

const Cart = ({ cart }: CartType) => {
  return <CartComponent cart={cart} />;
};

const mapStateToProps = ({ cart }: CartType) => ({ cart });

export default connect(mapStateToProps)(Cart);
