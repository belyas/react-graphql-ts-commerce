import {
  CATEGORIES_FETCHING,
  CATEGORIES_FETCHED,
  CATEGORIES_FAIL,
  CATEGORIES_FETCH_REQUEST,
} from './actionTypes';
import { IMenuCategory } from '../../types';

export const fetchingCategories = () => {
  return {
    type: CATEGORIES_FETCHING,
  };
};

export const categoriesFetchingFailed = (error: string) => {
  return {
    type: CATEGORIES_FAIL,
    payload: {
      error,
    },
  };
};

export const fetchedCategories = (categories: IMenuCategory[]) => {
  return {
    type: CATEGORIES_FETCHED,
    payload: {
      categories,
    },
  };
};

export const fetchCategories = () => ({
  type: CATEGORIES_FETCH_REQUEST,
});

// Redux thunk usage
// export const fetchCategories = () => {
//     return async dispatch => {
//         dispatch(fetchingCategories());

//         try {
//             const res = await axios.get('/categories');
//             const data = await res.data;

//             dispatch(fetchedCategories(data.data));
//         } catch (err) {
//             dispatch(categoriesFetchingFailed(err.message));
//         }
//     };
// };
