import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Popconfirm, Table, Tag } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  AdminUserIndexQuery,
  AdminUserIndexQuery_users_nodes,
} from './graphql/AdminUserIndexQuery';
import { AdminUserIndexUserDeletionMutation } from './graphql/AdminUserIndexUserDeletionMutation';
import { DeleteOutlined } from '@ant-design/icons';

const ALL_USERS = gql`
  query AdminUserIndexQuery {
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

const DELETE_USER = gql`
  mutation AdminUserIndexUserDeletionMutation($id: ID!) {
    deleteUser(input: { id: $id }) {
      user {
        name
        email
      }
    }
  }
`;

export default function UserIndex() {
  const [focusedUserId, setFocusedUserId] = useState<string>('');

  const { data } = useQuery<AdminUserIndexQuery>(ALL_USERS);
  const [deleteUser] = useMutation<AdminUserIndexUserDeletionMutation>(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const handleConfirm = () => {
    deleteUser({ variables: { id: focusedUserId } });
  };

  const handleCancel = () => {
    setFocusedUserId('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: AdminUserIndexQuery_users_nodes) => (
        <Link to={`/admin/users/${record.id}`}>{text}</Link>
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
    {
      title: 'Action',
      key: 'action',
      render: (record: AdminUserIndexQuery_users_nodes) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setFocusedUserId(record.id);
            }}
          />
        </Popconfirm>
      ),
    },
  ];

  const users = data?.users.nodes?.filter(user => !!user) ?? [];

  return (
    <>
      <Divider orientation="left">Users</Divider>
      <Table
        columns={columns}
        dataSource={users as AdminUserIndexQuery_users_nodes[]}
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
