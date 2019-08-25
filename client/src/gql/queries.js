import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
    query CategoriesQuery {
        categories {
            _id
            name
            image
            updatedAt
            createdAt
        }
    }
`;

export const GET_PRODUCTS = gql`
    query ProductsQuery {
        products {
            _id
            name
            image
            category
            price
            description
            quantity
        }
    }
`;
