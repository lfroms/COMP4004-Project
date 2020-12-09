import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from 'foundation';
import { Loading, TitleBar } from 'components';
import { createFriendlyDate } from 'helpers';
import { Button, Descriptions, Space, Table, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { CheckCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { SubmissionCreateModal } from 'sections/Enrollments/components';

import {
  DeliverableShowQuery,
  DeliverableShowQueryVariables,
  DeliverableShowQuery_deliverable_offering_students_nodes,
} from './graphql/DeliverableShowQuery';

interface ParamType {
  offeringId: string;
  deliverableId: string;
}

const DELIVERABLE = gql`
  query DeliverableShowQuery($userId: ID!, $deliverableId: ID!) {
    deliverable(id: $deliverableId) {
      id
      title
      description
      dueDate
      dueDatePassed
      weight
      currentSubmission: submissions(userId: $userId) {
        nodes {
          id
          grade {
            id
            value
          }
        }
      }
      offering {
        id
        currentEnrollment: enrollments(userId: $userId) {
          nodes {
            id
            role
          }
        }
        students: enrollments(role: student) {
          nodes {
            id
            user {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default function DeliverableShow() {
  const { id: userId } = useContext(CurrentUserContext);
  const { deliverableId } = useParams<ParamType>();

  const [submissionCreateModalVisible, setSubmissionCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<DeliverableShowQuery, DeliverableShowQueryVariables>(
    DELIVERABLE,
    {
      skip: !userId,
      // Non-null assertion since we skip this query if userID is undefined
      variables: { deliverableId, userId: userId! },
    }
  );

  const deliverable = data?.deliverable;

  if (loading) {
    return <Loading />;
  }

  if (!deliverable) {
    return null;
  }

  const currentUserRole = deliverable.offering.currentEnrollment.nodes?.[0]?.role;
  const students = deliverable.offering.students.nodes ?? [];

  // TODO: Implement their grade in the deliverable if it exists
  const columns: ColumnType<DeliverableShowQuery_deliverable_offering_students_nodes>[] = [
    {
      title: 'Student',
      dataIndex: 'name',
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: record => {
        return (
          <Button
            id={`add-grade-button-${record.user.id}`}
            style={{ color: '#6BCC3C', borderColor: '#6BCC3C' }}
            icon={<CheckCircleOutlined />}
          >
            Add grade
          </Button>
        );
      },
    },
  ];

  const studentTableMarkup =
    currentUserRole === 'professor' ? (
      <>
        <TitleBar.Secondary title="Student submissions" />
        <Table
          dataSource={students as DeliverableShowQuery_deliverable_offering_students_nodes[]}
          columns={columns}
        />
      </>
    ) : null;

  const grade = deliverable.currentSubmission.nodes?.[0]?.grade;

  const shouldShowSubmissionAction = currentUserRole === 'student';
  const submissionButtonDisabled =
    !!deliverable.currentSubmission.nodes?.[0] || deliverable.dueDatePassed;

  return (
    <>
      <TitleBar
        title={`Deliverable: ${deliverable.title}`}
        actions={...shouldShowSubmissionAction
          ? [
              {
                elementId: 'new_submission',
                icon: <FileAddOutlined />,
                onClick: () => setSubmissionCreateModalVisible(true),
                text: getSubmissionActionText(deliverable.dueDatePassed, submissionButtonDisabled),
                type: 'primary',
                disabled: submissionButtonDisabled,
              },
            ]
          : []}
      />

      <Space size="small" direction="vertical">
        <Typography.Text>{deliverable.description}</Typography.Text>

        <Descriptions bordered>
          <Descriptions.Item label="Due date">
            {createFriendlyDate(deliverable.dueDate)}
          </Descriptions.Item>

          {currentUserRole === 'student' && grade && (
            <Descriptions.Item label="Grade">{grade.value}</Descriptions.Item>
          )}
        </Descriptions>
      </Space>

      {studentTableMarkup}

      <SubmissionCreateModal
        deliverableId={deliverable.id}
        visible={submissionCreateModalVisible}
        onRequestClose={() => setSubmissionCreateModalVisible(false)}
      />
    </>
  );
}

function getSubmissionActionText(dueDatePassed: boolean, alreadySubmitted: boolean) {
  if (dueDatePassed) {
    return 'Due date passed';
  }

  if (alreadySubmitted) {
    return 'Submitted';
  }

  return 'Add submission';
}
