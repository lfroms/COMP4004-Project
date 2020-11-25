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

    if (!window.localStorage.getItem('token')) {
      // If there is no token, reload. Nothing to reset.
      window.location.reload();

      return response;
    }

    if (invalidToken) {
      // If there is a token and it is invalid, remove it and reset the store. The query will be retriggered,
      // resulting in a jump back to line 43 where the window will be reloaded.
      window.localStorage.removeItem('token');
      client.resetStore();
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
