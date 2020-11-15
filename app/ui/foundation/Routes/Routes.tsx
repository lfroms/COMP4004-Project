import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from 'sections';
import { Login } from 'sections';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
