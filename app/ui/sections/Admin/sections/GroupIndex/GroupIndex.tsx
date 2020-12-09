import React, { useState } from 'react';
import { Table } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { ColumnType } from 'antd/lib/table';
import { TitleBar } from 'components';
import { GroupCreateModal } from 'sections/Admin/components';

import { AdminGroupsQuery, AdminGroupsQuery_groups_nodes } from './graphql/AdminGroupsQuery';

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

export default function GroupIndex() {
  const [groupCreateModalVisible, setGroupCreateModalVisible] = useState(false);
  const { data, loading } = useQuery<AdminGroupsQuery>(ALL_GROUPS);

  const columns: ColumnType<AdminGroupsQuery_groups_nodes>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (first, second) => first.name.localeCompare(second.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Users',
      dataIndex: ['users', 'nodes', 'length'],
      sorter: (first, second) =>
        (first.users.nodes?.length ?? 0) - (second.users.nodes?.length ?? 0),
      sortDirections: ['ascend', 'descend'],
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
            icon: <AppstoreAddOutlined />,
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
