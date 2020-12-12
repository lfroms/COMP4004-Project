import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';
import { gql, useMutation, useQuery } from '@apollo/client';
import { TitleBar } from 'components';

import { UserCreateModal } from 'sections/Admin/components';

import {
  AdminUserIndexQuery,
  AdminUserIndexQuery_users_nodes,
} from './graphql/AdminUserIndexQuery';
import {
  AdminUserIndexUserDeletionMutation,
  AdminUserIndexUserDeletionMutationVariables,
} from './graphql/AdminUserIndexUserDeletionMutation';

import {
  AdminUserIndexUserApprovalMutation,
  AdminUserIndexUserApprovalMutationVariables,
} from './graphql/AdminUserIndexUserApprovalMutation';

const ALL_USERS = gql`
  query AdminUserIndexQuery {
    currentUser {
      id
    }
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
        id
        name
        email
      }
      errors {
        message
      }
    }
  }
`;

const APPROVE_USER = gql`
  mutation AdminUserIndexUserApprovalMutation($id: ID!, $approved: Boolean) {
    updateUser(input: { id: $id, approved: $approved }) {
      user {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function UserIndex() {
  const [userCreateModalVisible, setUserCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<AdminUserIndexQuery>(ALL_USERS);

  const [deleteUser, { loading: deleteUserLoading }] = useMutation<
    AdminUserIndexUserDeletionMutation,
    AdminUserIndexUserDeletionMutationVariables
  >(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const [approveUser, { loading: approveUserLoading }] = useMutation<
    AdminUserIndexUserApprovalMutation,
    AdminUserIndexUserApprovalMutationVariables
  >(APPROVE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteUser({ variables: { id } });
    data?.deleteUser?.errors.forEach(error => message.error(error.message));
  };

  const handleConfirmApprove = (id: string) => async () => {
    const { data } = await approveUser({ variables: { id, approved: true } });
    data?.updateUser?.errors.forEach(error => message.error(error.message));
  };

  const columns: ColumnType<AdminUserIndexQuery_users_nodes>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: any, record: AdminUserIndexQuery_users_nodes) => (
        <Link to={`/admin/users/${record.id}`}>{text}</Link>
      ),
      sorter: (first, second) => first.name.localeCompare(second.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (first, second) => first.email.localeCompare(second.email),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Status',
      dataIndex: 'approved',
      render: renderStatusTag,
      sorter: (first, second) => (first.approved ? 1 : 0) - (second.approved ? 1 : 0),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Type',
      dataIndex: 'admin',
      render: renderTypeTag,
      sorter: (first, second) => (first.admin ? 1 : 0) - (second.admin ? 1 : 0),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: (_value, record) => {
        if (record.id == data?.currentUser?.id) {
          return null;
        }

        const approvalMarkup = !record.approved ? (
          <Popconfirm
            placement="rightBottom"
            title="Are you sure you want to approve this user?"
            onConfirm={handleConfirmApprove(record.id)}
            okText="Confirm"
            okButtonProps={{ loading: approveUserLoading }}
            cancelText="Cancel"
          >
            <Button
              className="approve_user_button"
              id={`approve_user_id_${record.id}`}
              style={{ color: '#6BCC3C', borderColor: '#6BCC3C' }}
              icon={<CheckCircleOutlined />}
            />
          </Popconfirm>
        ) : null;

        const deleteMarkup = (
          <Popconfirm
            placement="rightBottom"
            title="Are you sure you want to delete this user?"
            onConfirm={handleConfirmDelete(record.id)}
            okText="Confirm"
            okButtonProps={{ loading: deleteUserLoading }}
            cancelText="Cancel"
          >
            <Button id={`delete_user_id_${record.id}`} danger icon={<DeleteOutlined />} />
          </Popconfirm>
        );

        return (
          <Space>
            {approvalMarkup}
            {deleteMarkup}
          </Space>
        );
      },
    },
  ];

  const users = data?.users.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Users"
        actions={[
          {
            elementId: 'new_course',
            icon: <UserAddOutlined />,
            onClick: () => setUserCreateModalVisible(true),
            text: 'New user',
          },
        ]}
      />

      <Table
        columns={columns}
        dataSource={users as AdminUserIndexQuery_users_nodes[]}
        pagination={false}
        loading={loading}
      />

      <UserCreateModal
        visible={userCreateModalVisible}
        onRequestClose={() => setUserCreateModalVisible(false)}
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
