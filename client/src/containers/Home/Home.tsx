import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';

import { GET_PRODUCTS } from '../../gql/queries';
import HomeComponent from '../../components/Home/Home';

const Home = () => {
  const { data, loading, error }: QueryResult = useQuery(GET_PRODUCTS);

  if (error) {
    return `Error! ${error.message}`;
  }

  return <HomeComponent loading={loading} products={data.products} />;
};

export default Home as React.ComponentType<any>;
