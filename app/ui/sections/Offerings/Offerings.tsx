import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { OfferingIndex } from './sections';

export default function Offerings() {
  return (
    <Switch>
      <Route exact path="/courses/all" component={OfferingIndex} />
    </Switch>
  );
}
