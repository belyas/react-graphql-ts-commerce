import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { GET_CATEGORIES } from '../../gql/queries';
import MenuComponent from '../../components/Menu/Menu';

const Menu = () => (
  <Query query={GET_CATEGORIES}>
    {({ data, loading, error }: QueryResult) => {
      if (error) {
        throw new Error(error.message);
      }

      return <MenuComponent loading={loading} categories={data.categories} />;
    }}
  </Query>
);

export default Menu;
