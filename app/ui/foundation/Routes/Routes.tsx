import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

  const {data} = useQuery(GET_CUR_USER);

    if (!data?.currentUser) {
      return <Route component={Login} />
    }

    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/courses" component={Home} />
      </Switch>
    )
}
