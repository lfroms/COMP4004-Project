import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { Space } from 'antd';
import { DeliverableCard, DeliverableCreateModal } from './components';

import { DashboardQuery, DashboardQueryVariables } from './graphql/DashboardQuery';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { CurrentUserContext } from 'foundation';

const DELIVERABLES = gql`
  query DashboardQuery($offeringId: ID!, $userId: ID!) {
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

      enrollments(userId: $userId) {
        nodes {
          id
          role
        }
      }
    }
  }
`;

interface ParamType {
  offeringId: string;
}

export default function Dashboard() {
  const { id: userId } = useContext(CurrentUserContext);
  const { offeringId } = useParams<ParamType>();
  const [deliverableCreateModalVisible, setDeliverableCreateModalVisible] = useState(false);
  const history = useHistory();

  const { data } = useQuery<DashboardQuery, DashboardQueryVariables>(DELIVERABLES, {
    variables: {
      offeringId,
      userId: userId!,
    },
  });

  const currentUserRole = data?.offering?.enrollments.nodes?.[0]?.role;

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

  const titleBarActions =
    currentUserRole === 'professor'
      ? [
          {
            elementId: 'add_deliverable_button',
            text: 'New Deliverable',
            icon: <AppstoreAddOutlined />,
            onClick: () => setDeliverableCreateModalVisible(true),
          },
        ]
      : [];

  return (
    <>
      <TitleBar title="Dashboard" actions={titleBarActions} />
      <Space direction="vertical" size="large">
        {deliverables}
      </Space>
      <DeliverableCreateModal
        offeringId={offeringId}
        visible={deliverableCreateModalVisible}
        onRequestClose={() => setDeliverableCreateModalVisible(false)}
      />
    </>
  );
}
