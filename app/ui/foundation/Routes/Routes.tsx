import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Home, Login } from 'sections';
import { gql, useQuery } from '@apollo/client';

export default function Routes() {
  const GET_CUR_USER = gql`
    query CurrentUser {
      currentUser {
        name
      }
    }
  `;

  const { data } = useQuery(GET_CUR_USER);

  if (!data?.currentUser) {
    return <Route component={Login} />;
  }

  return (
    <Switch>
      <Redirect exact from="/" to="/courses" />
      <Route exact path="/courses" component={Home} />
    </Switch>
  );
}
