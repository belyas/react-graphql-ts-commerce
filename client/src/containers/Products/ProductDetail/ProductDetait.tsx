import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import ProductDetailComponent from '../../../components/Product/ProductDetail/ProductDetail';
import { getProduct } from '../../../store/actions';
import { ICartItem } from '../../../types';

type Match = { params: { product_id: string } };
type Props = {
  match: Match;
  product: ICartItem;
  getProduct: (product_id: string) => void;
  loading: boolean;
};

const ProductDetail: React.FunctionComponent<Props> = ({
  match,
  getProduct,
  product = {},
  loading,
}) => {
  const product_id = match.params.product_id;
  const _props = { loading, product };
  const isProductEmpty = Object.keys(product).length === 0;

  useEffect(() => {
    if (isProductEmpty) {
      getProduct(product_id);
    }
    // eslint-disable-next-line
  }, [product_id]);

  return <ProductDetailComponent {..._props} />;
};

const mapStateToProps = (
  {
    product,
  }: {
    product: {
      single_product: ICartItem[];
      loading: boolean;
    };
  },
  { match }: { match: { params: { product_id: any } } }
) => ({
  product: product.single_product[match.params.product_id],
  loading: product.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getProduct }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
