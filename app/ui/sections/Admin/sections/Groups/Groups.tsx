import React from 'react';
import { Divider, Table } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { AdminGroupsQuery, AdminGroupsQuery_groups_nodes } from './graphql/AdminGroupsQuery';

export default function Groups() {
  const ALL_USERS = gql`
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

  const { data } = useQuery<AdminGroupsQuery>(ALL_USERS);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
