import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { EnrollmentIndex, EnrollmentShow } from './sections';

export default function Enrollments() {
  return (
    <Switch>
      <Route exact path="/courses" component={EnrollmentIndex} />
      <Route path="/courses/:offeringId" component={EnrollmentShow} />
    </Switch>
  );
}
