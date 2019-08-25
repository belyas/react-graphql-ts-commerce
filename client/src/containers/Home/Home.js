import React from 'react';
import { Query } from 'react-apollo';

import { GET_PRODUCTS } from '../../gql/queries';
import HomeComponent from '../../components/Home/Home';

const Home = () => (
    <Query query={GET_PRODUCTS}>
        {({ data: { products }, loading, error }) => {
            if (error) {
                throw new Error(error);
            }

            return <HomeComponent loading={loading} products={products} />;
        }}
    </Query>
);

export default Home;
