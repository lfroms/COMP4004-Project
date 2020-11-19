import React from 'react';
import { Divider, Table } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { AdminGroupsQuery, AdminGroupsQuery_groups_nodes } from './graphql/AdminGroupsQuery';

export default function Groups() {
  const ALL_GROUPS = gql`
    query AdminGroupsQuery {
      groups {
        nodes {
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

  const { data } = useQuery<AdminGroupsQuery>(ALL_GROUPS);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Users',
      dataIndex: ['users', 'nodes', 'length'],
      key: 'users',
    },
  ];

  const groups = data?.groups.nodes?.filter(group => !!group) ?? [];

  return (
    <>
      <Divider orientation="left">Groups</Divider>
      <Table
        columns={columns}
        dataSource={groups as AdminGroupsQuery_groups_nodes[]}
        pagination={false}
      />
    </>
  );
}
