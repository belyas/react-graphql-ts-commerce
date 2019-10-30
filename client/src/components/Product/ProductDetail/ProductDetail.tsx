import React from 'react';
import { Button } from 'reactstrap';

import { ICartItem } from '../../../types';

interface IProductDetailProps {
  product: ICartItem;
  setCartItem: (product: ICartItem) => void;
}

const ProductDetail = ({ product, setCartItem }: IProductDetailProps) => {
  return (
    <>
      {product && (
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

export default ProductDetail;
