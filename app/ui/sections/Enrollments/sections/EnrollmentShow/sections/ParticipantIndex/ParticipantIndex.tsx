import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { TitleBar } from 'components';
import { useParams } from 'react-router-dom';
import { Tag, Typography } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { createFriendlyDate } from 'helpers';

import {
  ParticipantIndexQuery,
  ParticipantIndexQueryVariables,
  ParticipantIndexQuery_offering_enrollments_nodes,
} from './graphql/ParticipantIndexQuery';

const PARTICIPANTS = gql`
  query ParticipantIndexQuery($offeringId: ID!) {
    currentUser {
      id
      enrollments(offeringId: $offeringId) {
        nodes {
          id
          role
        }
      }
    }
    offering(id: $offeringId) {
      id
      enrollments {
        nodes {
          id
          role
          deletedAt
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
  const { offeringId } = useParams<ParamType>();

  const { data, loading } = useQuery<ParticipantIndexQuery, ParticipantIndexQueryVariables>(
    PARTICIPANTS,
    {
      variables: {
        offeringId,
      },
    }
  );

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
  ];

  if (
    data?.currentUser?.enrollments.nodes &&
    data.currentUser.enrollments.nodes[0]?.role === 'professor'
  ) {
    const status: ColumnType<ParticipantIndexQuery_offering_enrollments_nodes> = {
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
    };

    columns.push(status);
  }

  return (
    <>
      <TitleBar title="Participants" />

      <Table
        columns={columns}
        dataSource={
          (data?.offering?.enrollments.nodes ??
            []) as ParticipantIndexQuery_offering_enrollments_nodes[]
        }
        pagination={false}
        loading={loading}
      />
    </>
  );
}
