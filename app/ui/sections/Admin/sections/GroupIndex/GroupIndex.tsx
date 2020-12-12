import React, { useState } from 'react';
import { Button, Popconfirm, Table, message } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ColumnType } from 'antd/lib/table';
import { TitleBar } from 'components';
import { GroupCreateModal } from 'sections/Admin/components';

import { AdminGroupsQuery, AdminGroupsQuery_groups_nodes } from './graphql/AdminGroupsQuery';
import {
  AdminGroupIndexDeleteGroupMutation,
  AdminGroupIndexDeleteGroupMutationVariables,
} from './graphql/AdminGroupIndexDeleteGroupMutation';

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

const DELETE_GROUP = gql`
  mutation AdminGroupIndexDeleteGroupMutation($id: ID!) {
    deleteGroup(input: { id: $id }) {
      group {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function GroupIndex() {
  const [groupCreateModalVisible, setGroupCreateModalVisible] = useState(false);
  const { data, loading } = useQuery<AdminGroupsQuery>(ALL_GROUPS);

  const [deleteGroup, { loading: deleteGroupLoading }] = useMutation<
    AdminGroupIndexDeleteGroupMutation,
    AdminGroupIndexDeleteGroupMutationVariables
  >(DELETE_GROUP, {
    refetchQueries: [{ query: ALL_GROUPS }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteGroup({ variables: { id } });
    data?.deleteGroup?.errors.forEach(error => message.error(error.message));
  };

  const columns: ColumnType<AdminGroupsQuery_groups_nodes>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (first, second) => first.name.localeCompare(second.name),
      sortDirections: ['ascend', 'descend'],
      render: (text, record) => <Link to={`/admin/groups/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Users',
      dataIndex: ['users', 'nodes', 'length'],
      sorter: (first, second) =>
        (first.users.nodes?.length ?? 0) - (second.users.nodes?.length ?? 0),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'actions',
      fixed: 'right',
      align: 'right',
      render: (_value, record) => (
        <Popconfirm
          placement="rightBottom"
          title="Are you sure you want to delete this group?"
          onConfirm={handleConfirmDelete(record.id)}
          okText="Confirm"
          okButtonProps={{ id: 'confirm_group_delete', loading: deleteGroupLoading }}
          cancelText="Cancel"
        >
          <Button id={`delete_group_id_${record.id}`} danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const groups = data?.groups.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Groups"
        actions={[
          {
            elementId: 'create_group',
            icon: <UsergroupAddOutlined />,
            text: 'New group',
            onClick: () => setGroupCreateModalVisible(true),
          },
        ]}
      />

      <Table
        columns={columns}
        dataSource={groups as AdminGroupsQuery_groups_nodes[]}
        pagination={false}
        loading={loading}
      />

      <GroupCreateModal
        visible={groupCreateModalVisible}
        onRequestClose={() => setGroupCreateModalVisible(false)}
      />
    </>
  );
}
