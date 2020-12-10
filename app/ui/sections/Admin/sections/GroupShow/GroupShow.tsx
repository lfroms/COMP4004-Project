import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Descriptions, Tag } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { Link, useParams } from 'react-router-dom';
import { TitleBar } from 'components';

import {
  AdminGroupShowQuery,
  AdminGroupShowQuery_group_users_nodes,
} from './graphql/AdminGroupShowQuery';

interface ParamType {
  groupId: string;
}

const TERM = gql`
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

export default function GroupShow() {
  const { groupId } = useParams<ParamType>();
  const { data, loading } = useQuery<AdminGroupShowQuery>(TERM, {
    variables: { id: groupId },
  });

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
