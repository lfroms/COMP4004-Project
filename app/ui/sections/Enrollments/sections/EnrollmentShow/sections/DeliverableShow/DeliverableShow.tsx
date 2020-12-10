import React, { useContext, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { CurrentUserContext } from 'foundation';
import { Loading, TitleBar } from 'components';
import { createFriendlyDate } from 'helpers';
import { Button, Descriptions, Space, Table, Typography, message } from 'antd';
import { ColumnType } from 'antd/lib/table';
import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { GradeCreateModal, SubmissionCreateModal } from 'sections/Enrollments/components';

import {
  DeliverableShowQuery,
  DeliverableShowQueryVariables,
  DeliverableShowQuery_deliverable_offering_students_nodes,
} from './graphql/DeliverableShowQuery';
import {
  DeliverableShowDeleteDeliverableMutation,
  DeliverableShowDeleteDeliverableMutationVariables,
} from './graphql/DeliverableShowDeleteDeliverableMutation';

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

              submissions(deliverableId: $deliverableId) {
                nodes {
                  id
                  attachmentUrl
                  grade {
                    value
                    comment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const DELETE_DELIVERABLE = gql`
  mutation DeliverableShowDeleteDeliverableMutation($id: ID!) {
    deleteDeliverable(input: { id: $id }) {
      deliverable {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function DeliverableShow() {
  const { user } = useContext(CurrentUserContext);
  const history = useHistory();

  const { deliverableId, offeringId } = useParams<ParamType>();
  const [createGradeModalVisible, setCreateGradeModalVisible] = useState(false);
  const [submissionCreateModalVisible, setSubmissionCreateModalVisible] = useState(false);
  const [focusedUserSubmissionId, setFocusedUserSubmissionId] = useState<string>('');

  const { data, loading } = useQuery<DeliverableShowQuery, DeliverableShowQueryVariables>(
    DELIVERABLE,
    {
      skip: !user,
      // Non-null assertion since we skip this query if userID is undefined
      variables: { deliverableId, userId: user!.id },
    }
  );

  const [deleteDeliverable, { loading: deleteLoading }] = useMutation<
    DeliverableShowDeleteDeliverableMutation,
    DeliverableShowDeleteDeliverableMutationVariables
  >(DELETE_DELIVERABLE, {
    refetchQueries: ['DeliverableShowQuery'],
  });

  const handleConfirmDelete = async () => {
    const { data } = await deleteDeliverable({ variables: { id: deliverableId } });
    data?.deleteDeliverable?.errors.forEach(error => message.error(error.message));

    if (data?.deleteDeliverable?.deliverable) {
      history.push(`/courses/${offeringId}`);
    }
  };

  const deliverable = data?.deliverable;

  if (loading || !user) {
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
      dataIndex: ['user', 'name'],
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: record => {
        console.log(record);
        const recordSubmission = record.user.submissions.nodes[0];

        if (recordSubmission) {
          return <p>Grade: {recordSubmission.grade.value * 100}%</p>;
        }

        return (
          <Button
            id={`add-grade-button-${record.user.id}`}
            style={recordSubmission ? { color: '#6BCC3C', borderColor: '#6BCC3C' } : {}}
            icon={<CheckCircleOutlined />}
            disabled={!recordSubmission}
            onClick={() => {
              setFocusedUserSubmissionId(recordSubmission.id);
              setCreateGradeModalVisible(true);
            }}
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
          pagination={false}
        />
      </>
    ) : null;

  const grade = deliverable.currentSubmission.nodes?.[0]?.grade;

  const isProfessor = currentUserRole === 'professor';
  const hasSubmission = !!deliverable.currentSubmission.nodes?.[0];
  const submissionButtonDisabled = hasSubmission || deliverable.dueDatePassed;

  return (
    <>
      <TitleBar
        title={`Deliverable: ${deliverable.title}`}
        actions={[
          {
            elementId: 'new_submission',
            icon: getSubmissionIcon(deliverable.dueDatePassed, hasSubmission),
            onClick: () => setSubmissionCreateModalVisible(true),
            text: getSubmissionActionText(deliverable.dueDatePassed, hasSubmission),
            type: 'primary',
            disabled: submissionButtonDisabled,
            hidden: isProfessor,
          },
          {
            elementId: 'delete_deliverable',
            icon: <DeleteOutlined />,
            text: 'Delete deliverable',
            type: 'default',
            danger: true,
            hidden: !isProfessor,
            popConfirm: {
              placement: 'bottomRight',
              title: 'Are you sure you want to delete this deliverable?',
              onConfirm: handleConfirmDelete,
              okText: 'Confirm',
              okButtonProps: { loading: deleteLoading },
              cancelText: 'Cancel',
            },
          },
        ]}
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

      <GradeCreateModal
        submissionId={focusedUserSubmissionId}
        visible={createGradeModalVisible}
        onRequestClose={() => setCreateGradeModalVisible(false)}
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

function getSubmissionIcon(dueDatePassed: boolean, alreadySubmitted: boolean) {
  if (dueDatePassed) {
    return <ClockCircleOutlined />;
  }

  if (alreadySubmitted) {
    return <CheckOutlined />;
  }

  return <FileAddOutlined />;
}
