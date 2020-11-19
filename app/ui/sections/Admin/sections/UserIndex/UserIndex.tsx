/* eslint-disable react/display-name */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, Table, Tag } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { AdminUsersQuery, AdminUsersQuery_users_nodes } from './graphql/AdminUsersQuery';

export default function UserIndex() {
  const ALL_USERS = gql`
    query AdminUsersQuery {
      users {
        nodes {
          id
          name
          email
          approved
          admin
        }
      }
    }
  `;

  const { data } = useQuery<AdminUsersQuery>(ALL_USERS);
  const history = useHistory();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: AdminUsersQuery_users_nodes) => (
        <Button type="link" onClick={() => history.push(`/admin/users/${record.id}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'approved',
      key: 'approved',
      render: renderStatusTag,
    },
    {
      title: 'Type',
      dataIndex: 'admin',
      key: 'admin',
      render: renderTypeTag,
    },
  ];

  const users = data?.users.nodes?.filter(user => !!user) ?? [];

  return (
    <>
      <Divider orientation="left">Users</Divider>
      <Table
        columns={columns}
        dataSource={users as AdminUsersQuery_users_nodes[]}
        pagination={false}
      />
    </>
  );
}

const renderStatusTag = (approved: boolean) => {
  const label = approved ? 'Approved' : 'Pending';
  const color = approved ? 'green' : 'orange';

  return <Tag color={color}>{label}</Tag>;
};

const renderTypeTag = (admin: boolean) => {
  const label = admin ? 'Admin' : 'Standard';
  const color = admin ? 'magenta' : 'geekblue';

  return <Tag color={color}>{label}</Tag>;
};
