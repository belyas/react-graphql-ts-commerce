import React from 'react';
import { Query } from 'react-apollo';

import { GET_CATEGORIES } from '../../gql/queries';
import MenuComponent from '../../components/Menu/Menu';

const Menu = () => (
    <Query query={GET_CATEGORIES}>
        {({ data: { categories }, loading, error }) => {
            if (error) {
                throw new Error(error);
            }

            return <MenuComponent loading={loading} categories={categories} />;
        }}
    </Query>
);

export default Menu;
