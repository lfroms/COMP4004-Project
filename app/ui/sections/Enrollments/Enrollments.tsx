import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { EnrollmentIndex } from './sections';

export default function Enrollments() {
  return (
    <Switch>
      <Route exact path="/courses" component={EnrollmentIndex} />
    </Switch>
  );
}
