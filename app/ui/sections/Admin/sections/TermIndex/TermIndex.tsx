import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { createFriendlyDate, createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { TermCreateModal } from 'sections/Admin/components';
import { TitleBar } from 'components';

import {
  AdminTermIndexQuery,
  AdminTermIndexQuery_terms_nodes,
} from './graphql/AdminTermIndexQuery';

const ALL_TERMS = gql`
  query AdminTermIndexQuery {
    terms {
      nodes {
        id
        startDate
        endDate
        registrationDeadline
        withdrawalDeadline
      }
    }
  }
`;

export default function TermIndex() {
  const [termCreateModalVisible, setTermCreateModalVisible] = useState(false);
  const { data, loading } = useQuery<AdminTermIndexQuery>(ALL_TERMS);

  const columns: ColumnType<AdminTermIndexQuery_terms_nodes>[] = [
    {
      dataIndex: 'name',
      render: (_value, record) => (
        <Link to={`/admin/terms/${record.id}`}>
          {createTermName(record.startDate, record.endDate)}
        </Link>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: value => createFriendlyDate(value),
      sorter: (first, second) =>
        new Date(first.startDate).getTime() - new Date(second.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: value => createFriendlyDate(value),
    },
  ];

  const terms = data?.terms.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Terms"
        actions={[
          {
            elementId: 'new_term',
            icon: <AppstoreAddOutlined />,
            onClick: () => setTermCreateModalVisible(true),
            text: 'New term',
          },
        ]}
      />

      <Table
        columns={columns}
        dataSource={terms as AdminTermIndexQuery_terms_nodes[]}
        pagination={false}
        loading={loading}
      />

      <TermCreateModal
        visible={termCreateModalVisible}
        onRequestClose={() => setTermCreateModalVisible(false)}
      />
    </>
  );
}
