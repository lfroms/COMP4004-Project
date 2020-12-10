import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Descriptions, Popconfirm, Tag, message } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { Link, useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { UsergroupDeleteOutlined } from '@ant-design/icons';

import {
  AdminGroupShowQuery,
  AdminGroupShowQuery_group_users_nodes,
} from './graphql/AdminGroupShowQuery';
import {
  AdminGroupShowRemoveUserMutation,
  AdminGroupShowRemoveUserMutationVariables,
} from './graphql/AdminGroupShowRemoveUserMutation';

interface ParamType {
  groupId: string;
}

const GROUP = gql`
  query AdminGroupShowQuery($id: ID!) {
    group(id: $id) {
      id
      name
      canSelfEnroll
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
  }
`;

const REMOVE_USER = gql`
  mutation AdminGroupShowRemoveUserMutation($userId: ID!, $groupId: ID!) {
    removeUserFromGroup(input: { userId: $userId, groupId: $groupId }) {
      errors {
        message
      }
    }
  }
`;

export default function GroupShow() {
  const { groupId } = useParams<ParamType>();
  const { data, loading } = useQuery<AdminGroupShowQuery>(GROUP, {
    variables: { id: groupId },
  });

  const [removeUserFromGroup, { loading: removeUserLoading }] = useMutation<
    AdminGroupShowRemoveUserMutation,
    AdminGroupShowRemoveUserMutationVariables
  >(REMOVE_USER, {
    refetchQueries: ['AdminGroupShowQuery'],
  });

  const handleConfirmRemove = (id: string) => async () => {
    const { data } = await removeUserFromGroup({ variables: { userId: id, groupId } });
    data?.removeUserFromGroup?.errors.forEach(error => message.error(error.message));
  };

  const group = data?.group;

  if (!group) {
    return null;
  }

  const columns: ColumnType<AdminGroupShowQuery_group_users_nodes>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => <Link to={`/admin/users/${record.id}`}>{text}</Link>,
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
      render: (_value, record) => (
        <Popconfirm
          placement="rightBottom"
          title="Are you sure you want to remove this user from the group?"
          onConfirm={handleConfirmRemove(record.id)}
          okText="Confirm"
          okButtonProps={{ id: 'confirm_user_approval', loading: removeUserLoading }}
          cancelText="Cancel"
        >
          <Button id={`remove_user_id_${record.id}`} danger icon={<UsergroupDeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <TitleBar title={group.name} />

      <Descriptions>
        <Descriptions.Item label="Members">{group.users.nodes?.length}</Descriptions.Item>
        <Descriptions.Item label="Users can self-enroll">
          {group.canSelfEnroll ? 'Yes' : 'No'}
        </Descriptions.Item>
      </Descriptions>

      <TitleBar.Secondary title="Members" />

      <Table
        columns={columns}
        dataSource={group.users.nodes as AdminGroupShowQuery_group_users_nodes[]}
        pagination={false}
        loading={loading}
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
