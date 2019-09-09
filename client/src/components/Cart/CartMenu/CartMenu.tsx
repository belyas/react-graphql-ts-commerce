import React from 'react';

import { concatClasses } from '../../../utils/helpers';
import CartDropDown from '../CartDropDown/CartDropDown';
import classes from './CartMenu.module.css';
import { ICartMenu } from '../../../types';

const CartMenu = ({
  cart: { items, totalPrice, totalItems },
  isOpen,
  toggleDropDown,
}: ICartMenu) => {
  return (
    <div className={concatClasses('nav-link', classes.headerCart)}>
      <span className={classes.cartTotlaItems}>{totalItems}</span>
      <i
        onClick={toggleDropDown}
        className={concatClasses(
          'fa',
          'fa-shopping-cart ',
          classes.cartIcon
        )}></i>

      <CartDropDown
        products={items}
        totalPrice={totalPrice}
        open={isOpen}
        onToggleDropDown={toggleDropDown}
      />
    </div>
  );
};

export default CartMenu;
