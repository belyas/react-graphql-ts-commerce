import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Spinner } from 'reactstrap';

import ProductDetailComponent from '../../../components/Product/ProductDetail/ProductDetail';
import { ICartItem } from '../../../types';
import { GET_PRODUCT } from '../../../gql/queries';
import { addToCart } from '../../../store/actions';

type Match = { params: { product_id: string } };
interface IProps {
  match: Match;
  setCartItem: (product: ICartItem) => void;
}

const ProductDetail = ({
  match: {
    params: { product_id },
  },
  setCartItem,
}: IProps) => {
  return (
    <Query query={GET_PRODUCT} variables={{ product_id }}>
      {({ data, loading, error }: QueryResult) => {
        if (error) {
          throw new Error(error.message);
        }

        if (loading) {
          return <Spinner color="primary" />;
        }

        const { product } = data;

        return (
          <ProductDetailComponent product={product} setCartItem={setCartItem} />
        );
      }}
    </Query>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCartItem: (product: ICartItem): void => {
      product.qty = 1; // hack qty for now
      dispatch(addToCart(product));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProductDetail);
