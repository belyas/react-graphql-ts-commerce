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
