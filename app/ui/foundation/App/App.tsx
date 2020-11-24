import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'foundation';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Frame } from 'components';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  // FIXME: It would be great if we could get the token using the `useToken` hook instead.
  // See https://github.com/lfroms/COMP4004-Project/pull/109
  const parsedToken = token ? JSON.parse(token) : undefined;

  const authorization = token && { Authorization: `Bearer ${parsedToken}` };

  return {
    headers: {
      ...headers,
      ...authorization,
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
    },
  };
});

const tokenMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const invalidToken = response.errors?.some(
      error => error.extensions?.reason === 'invalidToken'
    );

    if (invalidToken) {
      window.localStorage.removeItem('token');

      if (!window.location.pathname.includes('login')) {
        window.location.reload();
      }
    }

    return response;
  });
});

const client = new ApolloClient({
  link: authLink.concat(tokenMiddleware).concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Frame>
          <Routes />
        </Frame>
      </Router>
    </ApolloProvider>
  );
}
