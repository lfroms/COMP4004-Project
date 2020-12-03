import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Popconfirm, Row, Table, Tag, Typography, message } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserCreateModal } from 'sections/Admin/components';

import {
  AdminUserIndexQuery,
  AdminUserIndexQuery_users_nodes,
} from './graphql/AdminUserIndexQuery';
import {
  AdminUserIndexUserDeletionMutation,
  AdminUserIndexUserDeletionMutationVariables,
} from './graphql/AdminUserIndexUserDeletionMutation';

import * as styles from './UserIndex.module.scss';

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

export default function UserIndex() {
  const [userCreateModalVisible, setUserCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<AdminUserIndexQuery>(ALL_USERS);

  const [deleteUser, { loading: deleteUserLoading }] = useMutation<
    AdminUserIndexUserDeletionMutation,
    AdminUserIndexUserDeletionMutationVariables
  >(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteUser({ variables: { id } });
    data?.deleteUser?.errors.forEach(error => message.error(error.message));
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

        return (
          <Popconfirm
            placement="rightBottom"
            title="Are you sure you want to delete this user?"
            onConfirm={handleConfirmDelete(record.id)}
            okText="Confirm"
            okButtonProps={{ loading: deleteUserLoading }}
            cancelText="Cancel"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];

  const users = data?.users.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <Row align="middle" gutter={12}>
        <Col flex={1}>
          <Typography.Title level={2}>Users</Typography.Title>
        </Col>
        <Col>
          <Button
            id="new_course"
            icon={<AppstoreAddOutlined />}
            onClick={() => setUserCreateModalVisible(true)}
            className={styles.AddUserButton}
          >
            New user
          </Button>
        </Col>
      </Row>
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
