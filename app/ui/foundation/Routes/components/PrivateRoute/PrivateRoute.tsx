import React from 'react';
import { useToken } from 'hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps;

export default function PrivateRoute(props: Props) {
  const [token] = useToken();
  const authenticated = !!token;

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}
