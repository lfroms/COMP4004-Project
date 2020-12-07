import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { NavigationGroup, Page, TitleBar } from 'components';
import { Button, Empty, Popconfirm, Table, Tag } from 'antd';
import { CalendarOutlined, UserAddOutlined } from '@ant-design/icons';
import { createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table';
import {
  TermShowQuery,
  TermShowQuery_currentUser,
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
  const { data: data } = useQuery<TermShowQuery>(TERMS);

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
    current_user: TermShowQuery_currentUser
  ) => {
    return (
      enrollments.nodes &&
      enrollments.nodes.find(enrollment => enrollment?.user.id == current_user.id)
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

  if (data?.currentUser?.canSelfEnroll) {
    columns.push({
      key: 'actions',
      fixed: 'right',
      align: 'right',
      render: (_text, record) => {
        if (record.full) {
          return <Tag color="red">Full</Tag>;
        } else if (
          record.enrollments &&
          data.currentUser &&
          alreadyEnrolled(record.enrollments, data.currentUser)
        ) {
          return <Tag color="green">Enrolled</Tag>;
        } else {
          return (
            <Popconfirm
              title="Are you sure you want to enroll in this course?"
              placement="rightBottom"
              onConfirm={handleConfirmEnrollment(data?.currentUser?.id, record.id)}
              okText="Confirm"
              cancelText="Cancel"
              okButtonProps={{ loading: enrollLoading }}
            >
              <Button id="enroll" icon={<UserAddOutlined />} />
            </Popconfirm>
          );
        }
      },
    });
  }

  const currentTerm = data?.terms.nodes?.find(term => term?.id === termId);
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
