import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TermShow } from './sections';
export default function Terms() {
  return (
    <Switch>
      <Route exact path="/terms/:termId?" component={TermShow} />
    </Switch>
  );
}
