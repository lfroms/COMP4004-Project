import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Modal, Table, Tag } from 'antd';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  AdminUserIndexQuery,
  AdminUserIndexQuery_users_nodes,
} from './graphql/AdminUserIndexQuery';
import { AdminUserIndexUserDeletionMutation } from './graphql/AdminUserIndexUserDeletionMutation';
import { DeleteOutlined } from '@ant-design/icons';

export default function UserIndex() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUserIndexQuery_users_nodes>();

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

  const { data } = useQuery<AdminUserIndexQuery>(ALL_USERS);
  const [deleteUser, { loading: mutationLoading }] = useMutation<
    AdminUserIndexUserDeletionMutation
  >(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const handleConfirm = () => {
    console.log(userToDelete);
    deleteUser({ variables: { id: userToDelete?.id } });
    setDeleteModalOpen(false);
  };

  const handleCancel = () => {
    setUserToDelete(undefined);
    setDeleteModalOpen(false);
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
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setUserToDelete(record);
            setDeleteModalOpen(true);
          }}
        />
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
      <Modal
        title="Confirm deletion"
        visible={deleteModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            danger
            key="submit"
            type="primary"
            loading={mutationLoading}
            onClick={handleConfirm}
          >
            Confirm
          </Button>,
        ]}
      >
        {`Are you sure you want to delete ${userToDelete?.name}?`}
      </Modal>
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
