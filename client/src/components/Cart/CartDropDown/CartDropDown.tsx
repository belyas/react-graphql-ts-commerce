import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeFromCart } from '../../../store/actions/cart';
import ProductRow from './ProductRow/ProductRow';
import classes from './CartDropDown.module.css';
import { ICartDropDownProps, ICartItem } from '../../../types';

const CartDropDown: React.ComponentProps<any> = ({
  open,
  products,
  totalPrice,
  onToggleDropDown,
}: ICartDropDownProps) => {
  const dispatch = useDispatch();
  const removeItemFromCart = useCallback(
    (product: ICartItem) => dispatch(removeFromCart(product)),
    [dispatch]
  );
  let displayedContent = <p className={classes.EmptyCart}>Empty cart!</p>;

  if (open && products.length > 0) {
    displayedContent = (
      <>
        <div className={classes.ProductTotalPrice}>
          <b>Total price:</b>{' '}
          <span className={classes.Price}>${totalPrice}</span>
        </div>
        <Link
          to="/cart"
          className={classes.CheckoutBtn}
          onClick={onToggleDropDown}>
          Checkout
        </Link>
      </>
    );
  }

  return (
    open && (
      <div className={classes.DropDown}>
        {products.length > 0 &&
          products.map(product => (
            <ProductRow
              key={product._id}
              product={product}
              handleRemove={removeItemFromCart}
            />
          ))}
        {displayedContent}
      </div>
    )
  );
};

export default CartDropDown;
