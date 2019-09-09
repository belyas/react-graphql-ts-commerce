import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addToCart } from '../../../store/actions';
import withSpinner from '../../../hoc/WithSpinner/WithSpinner';
import { IProductDetailProps, ICartItem } from '../../../types';

const ProductDetail = ({
  product,
  loading,
  setCartItem,
}: IProductDetailProps) => {
  return (
    <>
      {!loading && product && (
        <div id="product-details" className="col-md-12">
          <div className="col-md-6 col-sm-12">
            <img
              src={product.image}
              className="img-responsive"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <h4>{product.name}</h4>
            {product.quantity && <p className="product-available">Available</p>}
            <p className="product-desc">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <div id="add-to-cart">
              <Button color="info" onClick={() => setCartItem(product)}>
                {' '}
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCartItem: (product: ICartItem) => {
      product.qty = 1; // hack qty for now
      dispatch(addToCart(product));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withSpinner(ProductDetail));
