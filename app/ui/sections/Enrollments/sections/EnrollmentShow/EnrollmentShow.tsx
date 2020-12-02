import React from 'react';
import { NavigationGroup, Page } from 'components';
import { CheckCircleOutlined, InboxOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { DeliverableIndex } from './sections';

interface ParamType {
  offeringId: string;
}

export default function EnrollmentShow() {
  const { offeringId } = useParams<ParamType>();
  const history = useHistory();
  const location = useLocation();

  const pathnameMatches = (string: string) => {
    return location.pathname.includes(string);
  };

  const groups: NavigationGroup[] = [
    {
      id: 'deliverables',
      title: 'Deliverables',
      icon: <InboxOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}/deliverables`),
    },
    {
      id: 'participants',
      title: 'Participants',
      icon: <UnorderedListOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}/participants`),
    },
    {
      id: 'grades',
      title: 'Grades',
      icon: <CheckCircleOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}/grades`),
    },
  ];

  const getSelectedKey = () => {
    if (pathnameMatches('/deliverables')) return 'deliverables';
    if (pathnameMatches('/participants')) return 'participants';
    if (pathnameMatches('/grades')) return 'grades';

    return 'deliverables';
  };

  return (
    <Page title="Course 1" groups={groups} selectedItemId={getSelectedKey()}>
      <Switch>
        <Route exact path="/courses/:offeringId/deliverables" component={DeliverableIndex} />

        <Redirect exact path="/courses/:offeringId" to="/courses/:offeringId/deliverables" />
      </Switch>
    </Page>
  );
}
