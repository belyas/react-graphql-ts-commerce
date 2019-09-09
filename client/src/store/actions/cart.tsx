import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './actionTypes';
import { ICartItem } from '../../types';

export const addToCart = (product: ICartItem) => ({
  type: CART_ADD_ITEM,
  payload: { product },
});

export const removeFromCart = (product: ICartItem) => ({
  type: CART_REMOVE_ITEM,
  payload: { product },
});
