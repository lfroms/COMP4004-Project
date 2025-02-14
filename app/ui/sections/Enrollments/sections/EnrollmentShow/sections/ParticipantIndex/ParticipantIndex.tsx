import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { TitleBar } from 'components';
import { useParams } from 'react-router-dom';
import { Button, Tag, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Table, { ColumnType } from 'antd/lib/table';
import { CurrentUserContext } from 'foundation';
import { createFriendlyDate } from 'helpers';

import { FinalGradeModal } from 'sections/Enrollments/components';

import {
  ParticipantIndexQuery,
  ParticipantIndexQueryVariables,
  ParticipantIndexQuery_offering_enrollments_nodes,
} from './graphql/ParticipantIndexQuery';

const PARTICIPANTS = gql`
  query ParticipantIndexQuery($offeringId: ID!, $userId: ID!) {
    offering(id: $offeringId) {
      id
      currentEnrollment: enrollments(userId: $userId) {
        nodes {
          id
          role
        }
      }
      enrollments(includingDropped: true) {
        nodes {
          id
          role
          deletedAt
          finalGrade
          user {
            id
            name
          }
        }
      }
    }
  }
`;

interface ParamType {
  offeringId: string;
}

export default function ParticipantIndex() {
  const { user } = useContext(CurrentUserContext);
  const { offeringId } = useParams<ParamType>();
  const [focusedEnrollmentId, setFocusedEnrollmentId] = useState<string | undefined>(undefined);

  const { data, loading } = useQuery<ParticipantIndexQuery, ParticipantIndexQueryVariables>(
    PARTICIPANTS,
    {
      skip: !user,
      variables: {
        offeringId,
        // Will always be present since we skip this query if it is not.
        userId: user?.id ?? '0',
      },
    }
  );

  const currentUserEnrollment = data?.offering?.currentEnrollment.nodes?.[0];
  const isProfessor = currentUserEnrollment?.role === 'professor';

  const columns: ColumnType<ParticipantIndexQuery_offering_enrollments_nodes>[] = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      sorter: (first, second) => first.user.name.localeCompare(second.user.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (text, record) => (
        <Tag
          color={record.role === 'professor' ? 'purple' : 'default'}
        >{`${text[0].toUpperCase()}${text.substr(1).toLowerCase()}`}</Tag>
      ),
      sorter: (first, second) => second.role.localeCompare(first.role),
      sortDirections: ['ascend', 'descend'],
    },
    ...(isProfessor
      ? ([
          {
            title: 'Status',
            dataIndex: 'deletedAt',
            render: (_text, record) => (
              <span>
                <Tag color={record.deletedAt ? 'red' : 'blue'}>
                  {record.deletedAt ? 'Dropped' : 'Enrolled'}
                </Tag>

                {record.deletedAt ? (
                  <Typography.Text type="secondary">{`as of ${createFriendlyDate(
                    record.deletedAt
                  )}`}</Typography.Text>
                ) : null}
              </span>
            ),
            sorter: (first, second) => first.deletedAt?.localeCompare(second.deletedAt),
            sortDirections: ['ascend', 'descend'],
          },
          {
            key: 'action',
            fixed: 'right',
            align: 'right',
            render: (_value, record) => {
              if (record.role === 'professor') {
                return null;
              }

              if (record.finalGrade) {
                return <>Final grade: {record.finalGrade}</>;
              }

              return (
                <Button
                  id={`add-final-grade-${record.user.id}`}
                  icon={<CheckOutlined />}
                  onClick={() => {
                    setFocusedEnrollmentId(record.id);
                  }}
                >
                  Add final grade
                </Button>
              );
            },
          },
        ] as ColumnType<ParticipantIndexQuery_offering_enrollments_nodes>[])
      : []),
  ];

  return (
    <>
      <TitleBar title="Participants" />

      <Table
        id="participant_index"
        columns={columns}
        dataSource={
          (data?.offering?.enrollments.nodes ??
            []) as ParticipantIndexQuery_offering_enrollments_nodes[]
        }
        pagination={false}
        loading={loading}
      />

      <FinalGradeModal
        visible={!!focusedEnrollmentId}
        enrollmentId={focusedEnrollmentId!}
        onRequestClose={() => setFocusedEnrollmentId(undefined)}
      />
    </>
  );
}
