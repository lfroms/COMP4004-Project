import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { Space } from 'antd';
import { DeliverableCard } from './components';

import { DashboardQuery, DashboardQueryVariables } from './graphql/DashboardQuery';

const DELIVERABLES = gql`
  query DashboardQuery($offeringId: ID!) {
    offering(id: $offeringId) {
      id
      deliverables {
        nodes {
          id
          title
          description
          dueDate
          weight
        }
      }
    }
  }
`;

interface ParamType {
  offeringId: string;
}

export default function Dashboard() {
  const { offeringId } = useParams<ParamType>();
  const history = useHistory();

  const { data } = useQuery<DashboardQuery, DashboardQueryVariables>(DELIVERABLES, {
    variables: {
      offeringId,
    },
  });

  const deliverables = data?.offering?.deliverables.nodes?.map((deliverable, index) => {
    if (!deliverable) {
      return null;
    }

    return (
      <DeliverableCard
        key={`dashboard-deliverable-${index}`}
        title={deliverable.title}
        description={deliverable.description}
        dueDate={deliverable.dueDate}
        onClick={() => history.push(`${offeringId}/deliverables/${deliverable.id}`)}
      />
    );
  });

  return (
    <>
      <TitleBar title="Dashboard" />
      <Space direction="vertical" size="large">
        {deliverables}
      </Space>
    </>
  );
}
