import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import classes from '../Product.module.css';
import { addToCart } from '../../../store/actions';
import { ICartItem, IProductCardProps } from '../../../types';

export const ProductCard = ({
  product: { _id, name, image, price, qty },
  setCartItem,
}: IProductCardProps) => {
  return (
    <div className={classes.ProductRow}>
      <img src={image} alt={name} className={classes.ProductRowImg} />
      <div className={classes.ProductRowBottom}>
        <Link to={`/product/${_id}`} className={classes.truncate}>
          <span>{name}</span>
        </Link>
        <span>${price}</span>
      </div>
      <span
        className={classes.ProductRowBtn}
        onClick={() => setCartItem({ _id, name, image, price, qty })}>
        Add to cart
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCartItem: (product: ICartItem) => {
    product.qty = 1; // hack qty for now
    dispatch(addToCart(product));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(ProductCard);
