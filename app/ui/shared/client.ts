import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
  createHttpLink,
  from,
  gql,
} from '@apollo/client';
import { cache, isAuthenticatedVar } from './cache';

import { TOKEN } from './constants';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const injectRequestAuthorizationMiddleware = new ApolloLink((operation, forward) => {
  const token = window.localStorage.getItem(TOKEN);
  const authorization = token && { Authorization: `Bearer ${token}` };

  operation.setContext({
    headers: {
      ...authorization,
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    },
  });

  return forward(operation);
});

const verifyResponseAuthorizationMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map(result => {
    const invalidToken = result.errors?.some(error => error.extensions?.reason === 'invalidToken');

    if (!invalidToken) {
      // Token is valid, do nothing.
      return result;
    }

    // Remove the token from local storage.
    localStorage.removeItem(TOKEN);
    isAuthenticatedVar(false);

    return result;
  });
});

export const typeDefs = gql`
  extend type Query {
    isAuthenticated: Boolean!
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([
    injectRequestAuthorizationMiddleware,
    verifyResponseAuthorizationMiddleware,
    httpLink,
  ]),
  cache,
  typeDefs,
});

export default client;
