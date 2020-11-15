import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from 'sections';
import { Home } from 'sections';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/courses" component={Home} />
    </Switch>
  );
}
