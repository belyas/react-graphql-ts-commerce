import React from 'react';

import classes from './CartRow.module.css';
import { ItemType } from '../../../types';

const CartRow = ({ item: { image, name, price, qty } }: ItemType) => (
  <div className={classes.CartRow}>
    <div className={classes.CartRowItem}>
      <img src={image} alt={name} />
    </div>
    <div className={classes.CartRowItem}>{name}</div>
    <div className={classes.CartRowItem}>${price}</div>
    <div className={classes.CartRowItem}>{qty}</div>
    <div className={classes.CartRowItem}>${price * (qty ? qty : 0)}</div>
  </div>
);

export default CartRow;
