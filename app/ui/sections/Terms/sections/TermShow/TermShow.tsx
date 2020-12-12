import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Loading, NavigationGroup, Page, TitleBar } from 'components';
import { Button, Descriptions, Empty, Popconfirm, Table, Tag, message } from 'antd';
import { CalendarOutlined, UserAddOutlined } from '@ant-design/icons';
import { createFriendlyDate, createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table';
import {
  TermShowQuery,
  TermShowQuery_terms_nodes_offerings_nodes,
  TermShowQuery_terms_nodes_offerings_nodes_enrollments,
} from './graphql/TermShowQuery';
import {
  TermShowEnrollmentCreationMutation,
  TermShowEnrollmentCreationMutationVariables,
} from './graphql/TermShowEnrollmentCreationMutation';

import * as styles from './TermShow.module.scss';

interface ParamType {
  termId: string;
}

const TERMS = gql`
  query TermShowQuery {
    currentUser {
      id
      canSelfEnroll
    }
    terms {
      nodes {
        id
        startDate
        endDate
        registrationDeadline
        offerings {
          nodes {
            id
            full
            section
            course {
              id
              name
              code
            }
            enrollments {
              nodes {
                id
                deletedAt
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_ENROLLMENT = gql`
  mutation TermShowEnrollmentCreationMutation($userId: ID!, $offeringId: ID!) {
    createEnrollment(input: { role: "student", userId: $userId, offeringId: $offeringId }) {
      enrollment {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function TermShow() {
  const { termId } = useParams<ParamType>();

  const history = useHistory();
  const { data, loading } = useQuery<TermShowQuery>(TERMS);
  const [createEnrollment, { loading: enrollLoading }] = useMutation<
    TermShowEnrollmentCreationMutation,
    TermShowEnrollmentCreationMutationVariables
  >(CREATE_ENROLLMENT);

  if (!data && loading) {
    return <Loading />;
  }

  if (!data?.currentUser) {
    return null;
  }

  const handleConfirmEnrollment = async (userId?: string, offeringId?: string) => {
    if (!userId || !offeringId) {
      return;
    }

    const { data: enrollData } = await createEnrollment({
      variables: { userId, offeringId },
      refetchQueries: ['TermShowQuery'],
      awaitRefetchQueries: true,
    });

    enrollData?.createEnrollment?.errors.forEach(error => message.error(error.message));
  };

  const alreadyEnrolled = (enrollments: TermShowQuery_terms_nodes_offerings_nodes_enrollments) => {
    return !!enrollments.nodes?.find(
      enrollment => enrollment?.user.id == data.currentUser?.id && !enrollment?.deletedAt
    );
  };

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
          onSelect: () => history.push(`/terms/${term.id}/courses`),
        };
      })
      .filter(Boolean) as NavigationGroup[]) ?? [];

  const emptyState = (
    <div className={styles.EmptyContainer}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Select a term to view available courses."
      />
    </div>
  );

  const currentTerm = data?.terms.nodes?.find(term => term?.id === termId);
  const currentTermRegDeadline = new Date(currentTerm?.registrationDeadline);
  const offerings = currentTerm?.offerings.nodes?.filter(Boolean) ?? [];
  const today = new Date();

  const columns: ColumnType<TermShowQuery_terms_nodes_offerings_nodes>[] = [
    {
      title: 'Name',
      dataIndex: ['course', 'name'],
      sorter: (first, second) => first.course.name.localeCompare(second.course.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course code',
      dataIndex: ['course', 'code'],
      sorter: (first, second) => second.course.name.localeCompare(first.course.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Section',
      dataIndex: 'section',
      sorter: (first, second) => first.section.localeCompare(second.section),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  if (data.currentUser.canSelfEnroll && today <= currentTermRegDeadline) {
    columns.push({
      title: 'Status',
      key: 'status',
      render: (_text, record) => {
        if (alreadyEnrolled(record.enrollments)) {
          return <Tag color="green">Enrolled</Tag>;
        }

        if (record.full) {
          return <Tag color="red">Full</Tag>;
        }

        return <Tag color="default">Open</Tag>;
      },
    });

    columns.push({
      key: 'actions',
      fixed: 'right',
      align: 'right',
      render: (_text, record) => {
        if (alreadyEnrolled(record.enrollments) || record.full) {
          return null;
        }

        return (
          <Popconfirm
            title="Are you sure you want to enroll in this course?"
            placement="rightBottom"
            onConfirm={() => handleConfirmEnrollment(data?.currentUser?.id, record.id)}
            okText="Confirm"
            cancelText="Cancel"
            okButtonProps={{ loading: enrollLoading }}
          >
            <Button id="enroll_button" icon={<UserAddOutlined />} />
          </Popconfirm>
        );
      },
    });
  }

  return (
    <Page title="Course Directory" groups={groups} selectedItemId={termId}>
      {currentTerm ? (
        <>
          <TitleBar title={`${createTermName(currentTerm.startDate, currentTerm.endDate)} term`} />
          <Descriptions>
            <Descriptions.Item label="Registration deadline">
              {createFriendlyDate(currentTerm.registrationDeadline)}
            </Descriptions.Item>
          </Descriptions>
          <Table
            columns={columns}
            dataSource={offerings as TermShowQuery_terms_nodes_offerings_nodes[]}
            pagination={false}
            loading={loading}
          />
        </>
      ) : (
        emptyState
      )}
    </Page>
  );
}
