import {
  CATEGORIES_FAIL,
  CATEGORIES_FETCHED,
  CATEGORIES_FETCHING,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';
import { IMenuCategories, IMenuCategory } from '../../types';

interface ICategoriesState extends IMenuCategories {
  error: string;
}

interface ICategoriesAction {
  type: string;
  payload: {
    categories: IMenuCategory[];
    error: string;
  };
}

const initialState: ICategoriesState = {
  categories: [],
  error: '',
  loading: false,
};

const failedCategories = (
  state: ICategoriesState,
  action: ICategoriesAction
) => {
  return updateObject(state, {
    error: action.payload.error,
  });
};

const fetchingCategories = (state: ICategoriesState) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchedCategories = (
  state: ICategoriesState,
  action: ICategoriesAction
) => {
  return updateObject(state, {
    loading: false,
    categories: action.payload.categories,
  });
};

const reducer = (state = initialState, action: ICategoriesAction) => {
  switch (action.type) {
    case CATEGORIES_FAIL:
      return failedCategories(state, action);
    case CATEGORIES_FETCHING:
      return fetchingCategories(state);
    case CATEGORIES_FETCHED:
      return fetchedCategories(state, action);
    default:
      return state;
  }
};

export default reducer;
