import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from 'shared';
import { CurrentUserContextProvider, Routes } from 'foundation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CurrentUserContextProvider>
        <Router>
          <Routes />
        </Router>
      </CurrentUserContextProvider>
    </ApolloProvider>
  );
}
