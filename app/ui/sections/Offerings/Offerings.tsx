import React from 'react';
import { NavigationGroup, Page } from 'components';
import { CalendarOutlined } from '@ant-design/icons';
import { Route, Switch, useHistory } from 'react-router-dom';

import { OfferingIndex } from './sections';
import { gql, useQuery } from '@apollo/client';
import { OfferingsQuery } from './graphql/OfferingsQuery';
import { useQueryParams } from 'hooks';
import { createTermName } from 'helpers';

export default function Offerings() {
  const TERMS = gql`
    query OfferingsQuery {
      terms {
        nodes {
          id
          startDate
          endDate
        }
      }
    }
  `;

  const history = useHistory();
  const params = useQueryParams();
  const { data } = useQuery<OfferingsQuery>(TERMS);

  const groups: NavigationGroup[] =
    (data?.terms.nodes
      ?.map(term => {
        if (!term) {
          return null;
        }

        return {
          id: `${term.id}`,
          title: createTermName(term.startDate, term.endDate),
          icon: <CalendarOutlined />,
          onSelect: () => history.push(`/courses/all?termId=${term.id}`),
        };
      })
      .filter(Boolean) as NavigationGroup[]) ?? [];

  return (
    <Page
      title="Course Directory"
      groups={groups}
      selectedItemId={params.get('termId') ?? undefined}
    >
      <Switch>
        <Route exact path="/courses/all" component={OfferingIndex} />
      </Switch>
    </Page>
  );
}
