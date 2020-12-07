import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { Card, Space, Typography } from 'antd';

import { DashboardQuery, DashboardQueryVariables } from './graphql/DashboardQuery';
import { createFriendlyDate } from 'helpers';

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
    const title = (
      <>
        <Typography.Text>{deliverable?.title}</Typography.Text>
        <Typography.Text type="secondary">
          {' '}
          - Due {createFriendlyDate(deliverable?.dueDate)}
        </Typography.Text>
      </>
    );

    return (
      <Card
        key={`dashboard-deliverable-${index}`}
        cover={<div style={{ backgroundColor: '#ddd', height: 70 }} />}
        onClick={() => history.push(`${offeringId}/deliverables/${deliverable?.id}`)}
        hoverable
      >
        <Card.Meta title={title} description={deliverable?.description} />
      </Card>
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
