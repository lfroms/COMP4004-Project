import React from 'react';
import { Table } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { AdminGroupsQuery, AdminGroupsQuery_groups_nodes } from './graphql/AdminGroupsQuery';
import { ColumnType } from 'antd/lib/table';
import { TitleBar } from 'components';

const ALL_GROUPS = gql`
  query AdminGroupsQuery {
    groups {
      nodes {
        id
        name
        users {
          nodes {
            id
          }
        }
      }
    }
  }
`;

export default function GroupIndex() {
  const { data, loading } = useQuery<AdminGroupsQuery>(ALL_GROUPS);

  const columns: ColumnType<AdminGroupsQuery_groups_nodes>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (first, second) => first.name.localeCompare(second.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Users',
      dataIndex: ['users', 'nodes', 'length'],
      sorter: (first, second) =>
        (first.users.nodes?.length ?? 0) - (second.users.nodes?.length ?? 0),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  const groups = data?.groups.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar title="Groups" />
      <Table
        columns={columns}
        dataSource={groups as AdminGroupsQuery_groups_nodes[]}
        pagination={false}
        loading={loading}
      />
    </>
  );
}
