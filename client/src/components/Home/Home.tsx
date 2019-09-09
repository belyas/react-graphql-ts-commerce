import React from 'react';
import { Spinner } from 'reactstrap';

import Product from '../Product/ProductCard/ProductCard';
import classes from '../Product/Product.module.css';
import { ICartItem } from '../../types';

type IProps = {
  products: ICartItem[];
  loading: boolean;
};

const Home = ({ products = [], loading }: IProps) => {
  if (loading) return <Spinner color="primary" />;

  return (
    <div className={classes.products__list}>
      {!!products.length &&
        products.map(product => {
          return <Product key={product._id} product={product} />;
        })}
    </div>
  );
};

export default Home;
