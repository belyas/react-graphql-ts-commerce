import React, { memo, useCallback, FC } from 'react';

import classes from './ProductRow.module.css';
import { IProductRowProps } from '../../../../types';

const ProductRow: FC<IProductRowProps> = ({
  product,
  handleRemove,
}: IProductRowProps) => {
  const removeItemFromCart = useCallback(() => handleRemove(product), [
    handleRemove,
    product,
  ]);

  return (
    <div className={classes.ProductRow}>
      <img
        src={product.image}
        className={classes.ProductRowImg}
        alt={product.name}
      />
      <div className={classes.ProductRowMain}>
        <h5 className={classes.ProductRowName}>{product.name}</h5>
        <span className={classes.ProductRowPrice}>${product.price}</span> X{' '}
        {product.qty}
      </div>
      <span
        className={classes.ProductRowRemoveBtn}
        onClick={removeItemFromCart}>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </span>
    </div>
  );
};

export default memo(ProductRow);
