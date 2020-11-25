import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Enrollments, Login } from 'sections';
import { Terms } from 'sections/Terms';
import { PrivateRoute } from './components';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <PrivateRoute path="/terms" component={Terms} />
      <PrivateRoute path="/courses" component={Enrollments} />
      <PrivateRoute path="/admin" component={Admin} />
      <Redirect path="*" to="/courses" />
    </Switch>
  );
}
