import React from 'react';
import { useAuthState } from 'hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Enrollments, Login, Logout, Registration } from 'sections';
import { Terms } from 'sections';
import { PrivateRoute } from './components';
import { Frame } from 'components';

export default function Routes() {
  const [authenticated] = useAuthState();

  if (!authenticated) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Redirect path="*" to="/login" />
      </Switch>
    );
  }

  return (
    <Frame>
      <Switch>
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/terms" component={Terms} />
        <PrivateRoute path="/courses" component={Enrollments} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect path="*" to="/courses" />
      </Switch>
    </Frame>
  );
}
