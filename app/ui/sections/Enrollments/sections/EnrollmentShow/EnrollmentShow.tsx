import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { NavigationGroup, Page } from 'components';
import { CheckCircleOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { Dashboard, DeliverableShow, GradeIndex, ParticipantIndex } from './sections';
import { createTermName } from 'helpers';

import { EnrollmentShowQuery, EnrollmentShowQueryVariables } from './graphql/EnrollmentShowQuery';
import { CurrentUserContext } from 'foundation';

interface ParamType {
  offeringId: string;
}

const ENROLLMENT = gql`
  query EnrollmentShowQuery($offeringId: ID!, $userId: ID!) {
    offering(id: $offeringId) {
      id
      section
      course {
        id
        name
        code
      }
      term {
        id
        startDate
        endDate
      }
      currentEnrollment: enrollments(userId: $userId) {
        nodes {
          id
          role
        }
      }
    }
  }
`;

export default function EnrollmentShow() {
  const { user } = useContext(CurrentUserContext);
  const { offeringId } = useParams<ParamType>();
  const history = useHistory();
  const location = useLocation();

  const { data } = useQuery<EnrollmentShowQuery, EnrollmentShowQueryVariables>(ENROLLMENT, {
    skip: !user,
    variables: {
      offeringId,
      userId: user?.id ?? '0',
    },
  });

  if (!data?.offering) {
    return null;
  }

  const pathnameMatches = (string: string) => {
    return location.pathname.includes(string);
  };

  const groups: NavigationGroup[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <DashboardOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}`),
    },
    {
      id: 'participants',
      title: 'Participants',
      icon: <TeamOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}/participants`),
    },
    {
      id: 'grades',
      title: 'Grades',
      icon: <CheckCircleOutlined />,
      onSelect: () => history.push(`/courses/${offeringId}/grades`),
      hidden: data.offering.currentEnrollment.nodes?.[0]?.role === 'professor',
    },
  ];

  const getSelectedKey = () => {
    if (pathnameMatches('/participants')) return 'participants';
    if (pathnameMatches('/grades')) return 'grades';
    if (pathnameMatches('/deliverables')) return undefined;

    return 'dashboard';
  };

  const {
    offering: {
      course: { code: courseCode },
      section,
      term: { startDate, endDate },
    },
  } = data;

  return (
    <Page
      title={`${courseCode} ${section}`}
      onBack={() => history.push('/courses')}
      subtitle={`${createTermName(startDate, endDate)} term`}
      groups={groups}
      selectedItemId={getSelectedKey()}
    >
      <Switch>
        <Route exact path="/courses/:offeringId" component={Dashboard} />
        <Route exact path="/courses/:offeringId/participants" component={ParticipantIndex} />
        <Route
          path="/courses/:offeringId/deliverables/:deliverableId"
          component={DeliverableShow}
        />
        <Route exact path="/courses/:offeringId/grades" component={GradeIndex} />
      </Switch>
    </Page>
  );
}
