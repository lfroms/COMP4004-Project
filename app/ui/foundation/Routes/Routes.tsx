import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Home, Login } from 'sections';
import { PrivateRoute } from './components';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <PrivateRoute exact path="/courses" component={Home} />
      <PrivateRoute path="/admin" component={Admin} />
      <Redirect path="*" to="/courses" />
    </Switch>
  );
}
