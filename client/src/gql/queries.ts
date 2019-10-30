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

export const GET_PRODUCT = gql`
  query ProductQuery($product_id: String!) {
    product(product_id: $product_id) {
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

export const AUTH_LOGIN = gql`
  mutation AuthLoginMutation($email: String!, $password: String!) {
    authLogin(email: $email, password: $password) {
      token
      userId
      error
    }
  }
`;

export const AUTH_SIGNUP = gql`
  mutation AuthSignup(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    authSignup(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      error
      success
    }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProductsQuery($category_id: String!) {
    categoryProducts(category_id: $category_id) {
      name
      image
      _id
      price
      qty
      quantity
      description
    }
  }
`;
