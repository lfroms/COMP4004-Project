import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { Card, Space, Typography } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { CurrentUserContext } from 'foundation';
import { createCourseColor } from 'helpers';
import { DeliverableCard, DeliverableCreateModal } from './components';

import { DashboardQuery, DashboardQueryVariables } from './graphql/DashboardQuery';

import * as styles from './Dashboard.module.scss';

const DELIVERABLES = gql`
  query DashboardQuery($offeringId: ID!, $userId: ID!) {
    offering(id: $offeringId) {
      id
      course {
        id
        name
      }
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
          finalGrade
        }
      }
    }
  }
`;

interface ParamType {
  offeringId: string;
}

export default function Dashboard() {
  const { user } = useContext(CurrentUserContext);
  const { offeringId } = useParams<ParamType>();
  const [deliverableCreateModalVisible, setDeliverableCreateModalVisible] = useState(false);
  const history = useHistory();

  const { data } = useQuery<DashboardQuery, DashboardQueryVariables>(DELIVERABLES, {
    skip: !user,
    variables: {
      offeringId,
      userId: user!.id,
    },
  });

  const currentUserEnrollment = data?.offering?.enrollments.nodes?.[0];
  const currentUserRole = currentUserEnrollment?.role;

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
            text: 'New deliverable',
            icon: <AppstoreAddOutlined />,
            onClick: () => setDeliverableCreateModalVisible(true),
          },
        ]
      : [];

  return (
    <>
      <Space direction="vertical" size="large">
        <Card
          style={{ backgroundColor: createCourseColor(data?.offering?.course.name) }}
          bordered={false}
        >
          <div className={styles.OverviewContainer}>
            <Typography.Title level={2} className={styles.CourseTitle}>
              {data?.offering?.course.name}
            </Typography.Title>

            {currentUserEnrollment?.finalGrade && (
              <div className={styles.FinalGrade}>
                <Typography.Text>Final Grade</Typography.Text>
                <Typography.Title level={4} className={styles.FinalGradeContent}>
                  {currentUserEnrollment.finalGrade}
                </Typography.Title>
              </div>
            )}
          </div>
        </Card>

        <TitleBar title="Course deliverables" actions={titleBarActions} />
      </Space>

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
