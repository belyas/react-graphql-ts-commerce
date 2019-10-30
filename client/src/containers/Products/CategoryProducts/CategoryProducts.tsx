import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import CategoryProductsComponent from '../../../components/Product/CategoryProducts/CategoryProducts';
import { ICartItem } from '../../../types';
import { GET_CATEGORY_PRODUCTS } from '../../../gql/queries';

type Match = { params: { category_id: string } };
type Props = {
  match: Match;
  products: ICartItem[];
  getProducts: (category_id: string) => void;
  loading: boolean;
};

const CategoryProducts: React.FunctionComponent<Props> = ({
  match: {
    params: { category_id },
  },
  ...props
}) => {
  return (
    <Query query={GET_CATEGORY_PRODUCTS} variables={{ category_id }}>
      {({ data, error, loading }: QueryResult) => {
        if (error) {
          throw new Error(error.message);
        }

        return (
          <CategoryProductsComponent
            loading={loading}
            products={data.categoryProducts || []}
            {...props}
          />
        );
      }}
    </Query>
  );
};

export default CategoryProducts;
