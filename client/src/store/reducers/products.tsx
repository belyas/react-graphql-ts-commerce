import {
  PRODUCTS_FAIL,
  PRODUCTS_FETCHED,
  PRODUCTS_FETCHING,
  CATEGORY_PRODUCTS_FETCHED,
  SINGLE_PRODUCT_FETCHED,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';
import { ICartItem } from '../../types';

interface IProductsState {
  error: string;
  loading: boolean;
  products: ICartItem[];
  category_products: { [key: string]: ICartItem[] };
  category_id: string;
  single_product: { [key: string]: ICartItem };
}
interface IProductsAction {
  type: string;
  payload: {
    error: string;
    products: ICartItem[];
    category_id: string;
    product_id: string;
    product: ICartItem;
  };
}

const initialState: IProductsState = {
  error: '',
  loading: false,
  products: [],
  category_products: {},
  category_id: '',
  single_product: {},
};

const failedProducts = (state: IProductsState, action: IProductsAction) => {
  return updateObject(state, { error: action.payload.error, loading: false });
};

const startFetchingProducts = (state: IProductsState) => {
  return updateObject(state, { loading: true });
};

const fetchedProducts = (state: IProductsState, action: IProductsAction) => {
  return updateObject(state, {
    loading: false,
    products: action.payload.products,
  });
};

const fetchedCategoryProducts = (
  state: IProductsState,
  action: IProductsAction
) => {
  const { category_id, products } = action.payload;

  return updateObject(state, {
    loading: false,
    category_id,
    category_products: {
      ...state.category_products,
      [category_id]: products,
    },
  });
};

const fetchedSingleProduct = (
  state: IProductsState,
  action: IProductsAction
) => {
  const { product_id, product } = action.payload;

  return updateObject(state, {
    loading: false,
    single_product: {
      ...state.single_product,
      [product_id]: product,
    },
  });
};

const reducer = (state = initialState, action: IProductsAction) => {
  switch (action.type) {
    case PRODUCTS_FAIL:
      return failedProducts(state, action);
    case PRODUCTS_FETCHING:
      return startFetchingProducts(state);
    case PRODUCTS_FETCHED:
      return fetchedProducts(state, action);
    case CATEGORY_PRODUCTS_FETCHED:
      return fetchedCategoryProducts(state, action);
    case SINGLE_PRODUCT_FETCHED:
      return fetchedSingleProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
