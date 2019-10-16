import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const BASE_URL = 'http://localhost:8000/graphql';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: BASE_URL,
  // headers: {}
});
const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
