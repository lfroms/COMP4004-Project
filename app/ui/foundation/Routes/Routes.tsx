import React from 'react';
import { useAuthState } from 'hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Enrollments, Login } from 'sections';
import { Terms } from 'sections';
import { PrivateRoute } from './components';
import { Frame } from 'components';

export default function Routes() {
  const [authenticated] = useAuthState();

  if (!authenticated) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect path="*" to="/login" />
      </Switch>
    );
  }

  return (
    <Frame>
      <Switch>
        <PrivateRoute path="/terms" component={Terms} />
        <PrivateRoute path="/courses" component={Enrollments} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect path="*" to="/courses" />
      </Switch>
    </Frame>
  );
}
