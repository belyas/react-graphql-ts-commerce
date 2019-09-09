import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CategoryProductsComponent from '../../../components/Product/CategoryProducts/CategoryProducts';
import { getCategoryProducts } from '../../../store/actions';
import { ICartItem } from '../../../types';

type Match = { params: { category_id: string } };
type Props = {
  match: Match;
  products: ICartItem[];
  getProducts: (category_id: string) => void;
  loading: boolean;
};

const CategoryProducts: React.FunctionComponent<Props> = ({
  match,
  products = [],
  getProducts,
  loading,
  ...props
}) => {
  const { category_id } = match.params;
  const childProps = {
    ...props,
    products,
    loading,
  };

  useEffect(() => {
    if (!products.length) {
      getProducts(category_id);
    }
    // eslint-disable-next-line
  }, [category_id]);

  return <CategoryProductsComponent {...childProps} />;
};

const mapStateToProps = (
  {
    product,
  }: {
    product: {
      category_products: ICartItem[][];
      loading: boolean;
    };
  },
  { match: { params } }: { match: { params: { category_id: any } } }
) => {
  return {
    products: product.category_products[params.category_id],
    loading: product.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProducts: (category_id: string) =>
    dispatch(getCategoryProducts(category_id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProducts);
