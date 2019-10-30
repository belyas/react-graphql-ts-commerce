import React from 'react';

import Product from '../ProductCard/ProductCard';
import withSpinner from '../../../hoc/WithSpinner/WithSpinner';
import { ICartItem } from '../../../types';

import classes from '../Product.module.css';

interface IProducts {
  products: ICartItem[];
}

const CategoryProducts = ({ products = [] }: IProducts) => {
  return (
    <div className={classes.products__list}>
      {!!products.length &&
        products.map(product => {
          return <Product key={product._id} product={product} />;
        })}
    </div>
  );
};

export default withSpinner(CategoryProducts);
