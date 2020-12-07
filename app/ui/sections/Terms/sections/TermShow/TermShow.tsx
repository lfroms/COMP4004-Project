import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { NavigationGroup, Page, TitleBar } from 'components';
import { Button, Empty, Popconfirm, Table } from 'antd';
import { CalendarOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table';
import {
  TermShowCurrentUserQuery,
  TermShowCurrentUserQuery_currentUser,
} from './graphql/TermShowCurrentUserQuery';
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

const TERMS_WITH_OFFERINGS = gql`
  query TermShowQuery {
    terms {
      nodes {
        id
        startDate
        endDate
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

const USER_CAN_SELF_ENROLL = gql`
  query TermShowCurrentUserQuery {
    currentUser {
      id
      canSelfEnroll
    }
  }
`;

const CREATE_ENROLLMENT = gql`
  mutation TermShowEnrollmentCreationMutation($userId: ID!, $offeringId: ID!) {
    createEnrollment(input: { role: "student", userId: $userId, offeringId: $offeringId }) {
      enrollment {
        id
      }
    }
  }
`;

export default function TermShow() {
  const { termId } = useParams<ParamType>();

  const history = useHistory();
  const { data: data1 } = useQuery<TermShowQuery>(TERMS_WITH_OFFERINGS);
  const { data: data2 } = useQuery<TermShowCurrentUserQuery>(USER_CAN_SELF_ENROLL);

  const [createEnrollment, { loading: enrollLoading }] = useMutation<
    TermShowEnrollmentCreationMutation,
    TermShowEnrollmentCreationMutationVariables
  >(CREATE_ENROLLMENT, {
    refetchQueries: ['TermShowQuery'],
  });

  const handleConfirmEnrollment = (userId?: string, offeringId?: string) => () => {
    if (userId && offeringId) {
      createEnrollment({ variables: { userId, offeringId } });
    }
  };

  const alreadyEnrolled = (
    enrollments: TermShowQuery_terms_nodes_offerings_nodes_enrollments,
    current_user: TermShowCurrentUserQuery_currentUser
  ) => {
    return (
      enrollments.nodes &&
      enrollments.nodes.find(enrollment => enrollment?.user.id == current_user.id)
    );
  };
  const groups: NavigationGroup[] =
    (data1?.terms.nodes
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

  if (data2?.currentUser?.canSelfEnroll) {
    columns.push({
      key: 'actions',
      fixed: 'right',
      align: 'right',
      render: (_text, record) => {
        if (record.full) {
          return <p>full</p>;
        } else if (
          record.enrollments &&
          data2.currentUser &&
          alreadyEnrolled(record.enrollments, data2.currentUser)
        ) {
          return <p>already enrolled</p>;
        } else {
          return (
            <Popconfirm
              title="Are you sure you want to enroll in this course?"
              placement="rightBottom"
              onConfirm={handleConfirmEnrollment(data2?.currentUser?.id, record.id)}
              okText="Confirm"
              cancelText="Cancel"
              okButtonProps={{ loading: enrollLoading }}
            >
              <Button icon={<PlusSquareOutlined />} />
            </Popconfirm>
          );
        }
      },
    });
  }

  const currentTerm = data1?.terms.nodes?.find(term => term?.id === termId);
  const offerings = currentTerm?.offerings.nodes?.filter(Boolean) ?? [];

  return (
    <Page title="Course Directory" groups={groups} selectedItemId={termId}>
      {currentTerm ? (
        <>
          <TitleBar title={`${createTermName(currentTerm.startDate, currentTerm.endDate)} term`} />
          <Table
            columns={columns}
            dataSource={offerings as TermShowQuery_terms_nodes_offerings_nodes[]}
            pagination={false}
          />
        </>
      ) : (
        emptyState
      )}
    </Page>
  );
}
