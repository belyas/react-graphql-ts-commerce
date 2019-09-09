import React from 'react';

import Product from '../ProductCard/ProductCard';
import withSpinner from '../../../hoc/WithSpinner/WithSpinner';
import { IProducts } from '../../../types';

import classes from '../Product.module.css';

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
