import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NavigationGroup, Page } from 'components';
import { CheckCircleOutlined, InboxOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { DeliverableIndex } from './sections';
import { createTermName } from 'helpers';

import { EnrollmentShowQuery, EnrollmentShowQueryVariables } from './graphql/EnrollmentShowQuery';

interface ParamType {
  offeringId: string;
}

const ENROLLMENT = gql`
  query EnrollmentShowQuery($offeringId: ID!) {
    currentUser {
      enrollments(offeringId: $offeringId) {
        nodes {
          id
          role
        }
      }
    }
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
    }
  }
`;

export default function EnrollmentShow() {
  const { offeringId } = useParams<ParamType>();
  const history = useHistory();
  const location = useLocation();

  const { data } = useQuery<EnrollmentShowQuery, EnrollmentShowQueryVariables>(ENROLLMENT, {
    variables: {
      offeringId,
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
      subtitle={`${createTermName(startDate, endDate)} term`}
      groups={groups}
      selectedItemId={getSelectedKey()}
    >
      <Switch>
        <Route exact path="/courses/:offeringId/deliverables" component={DeliverableIndex} />

        <Redirect exact path="/courses/:offeringId" to="/courses/:offeringId/deliverables" />
      </Switch>
    </Page>
  );
}
