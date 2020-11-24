import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Enrollments, Login, Offerings } from 'sections';
import { PrivateRoute } from './components';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />

      <PrivateRoute exact path="/courses/all" component={Offerings} />
      <PrivateRoute path="/courses" component={Enrollments} />
      <PrivateRoute path="/admin" component={Admin} />
      <Redirect path="*" to="/courses" />
    </Switch>
  );
}
