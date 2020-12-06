import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { NavigationGroup, Page, TitleBar } from 'components';
import { Button, Empty, Popconfirm, Table } from 'antd';
import { CalendarOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table';
import { TermCurrentUserQuery } from './graphql/TermCurrentUserQuery';
import { TermShowQuery, TermShowQuery_terms_nodes_offerings_nodes } from './graphql/TermShowQuery';

import * as styles from './TermShow.module.scss';

interface ParamType {
  termId: string;
}

export default function TermShow() {
  const { termId } = useParams<ParamType>();

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
              section
              course {
                id
                name
                code
              }
            }
          }
        }
      }
    }
  `;

  const USER_CAN_SELF_ENROLL = gql`
    query TermCurrentUserQuery {
      currentUser {
        canSelfEnroll
        enrollments {
          nodes {
            id
          }
        }
      }
    }
  `;

  //   const CREATE_ENROLLMENT = gql`
  //   mutation TermShowEnrollmentCreationMutation($id: ID!) {
  //     createEnrollment(input: { id: $id }) {
  //       enrollment {
  //         id
  //       }
  //     }
  //   }
  // `;

  const history = useHistory();
  const { data: data1 } = useQuery<TermShowQuery>(TERMS_WITH_OFFERINGS);
  const { data: data2 } = useQuery<TermCurrentUserQuery>(USER_CAN_SELF_ENROLL);

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

  // const [enroll, { loading: enrollLoading }] = useMutation<
  //   TermShowEnrollMutation,
  //   AdminTermShowEnrollMutationVariables
  // >(ENROLL, {
  //   refetchQueries: ['TermShowQuery'],
  // });

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
      // render: (_text, record) => (
      render: () => (
        <Popconfirm
          title="Are you sure you want to enroll in this course?"
          placement="rightBottom"
          // onConfirm={handleConfirmEnroll(record.id)}
          okText="Confirm"
          cancelText="Cancel"
          // okButtonProps={{ loading: deleteLoading }}
        >
          <Button icon={<PlusSquareOutlined />} />
        </Popconfirm>
      ),
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
