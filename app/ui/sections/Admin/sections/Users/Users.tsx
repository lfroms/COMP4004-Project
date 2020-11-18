import React from 'react';
import { Divider, Table, Tag } from 'antd';
import { gql, useQuery } from '@apollo/client';

export default function Users() {
  const ALL_USERS = gql`
    query Users {
      users {
        edges {
          node {
            name
            email
            approved
            admin
          }
        }
      }
    }
  `;

  const { data } = useQuery(ALL_USERS);

  const users = data?.users.edges.map((user: { node: any }) => user.node);
  console.log(users);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Approval status',
      dataIndex: 'approved',
      key: 'approved',
      // eslint-disable-next-line react/display-name
      render: (approved: any) => {
        return approved ? <Tag color="green">Approved</Tag> : <Tag color="red">Not approved</Tag>;
      },
    },
    {
      title: 'Admin status',
      dataIndex: 'admin',
      key: 'admin',
      // eslint-disable-next-line react/display-name
      render: (admin: any) => {
        return admin ? <Tag color="magenta">Admin</Tag> : <Tag color="geekblue">Non Admin</Tag>;
      },
    },
  ];

  return (
    <>
      <Divider orientation="left">Users</Divider>
      <Table columns={columns} dataSource={users} pagination={false} />
    </>
  );
}
