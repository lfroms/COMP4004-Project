import { useAuthState } from 'hooks';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps;

export default function PrivateRoute(props: Props) {
  const [authenticated] = useAuthState();

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}
