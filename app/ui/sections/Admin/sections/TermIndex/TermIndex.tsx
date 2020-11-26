import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { createFriendlyDate, createTermName } from 'helpers';
import { Link } from 'react-router-dom';

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
        financialDeadline
        registrationDeadline
        withdrawalDeadline
      }
    }
  }
`;

export default function TermIndex() {
  const { data, loading } = useQuery<AdminTermIndexQuery>(ALL_TERMS);

  const columns: ColumnType<AdminTermIndexQuery_terms_nodes>[] = [
    {
      dataIndex: 'name',
      render: (value, record) => (
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
    {
      title: 'Financial deadline',
      dataIndex: 'financialDeadline',
      render: value => createFriendlyDate(value),
    },
    {
      title: 'Withdrawal deadline',
      dataIndex: 'withdrawalDeadline',
      render: value => createFriendlyDate(value),
    },
    {
      title: 'Registration deadline',
      dataIndex: 'registrationDeadline',
      render: value => createFriendlyDate(value),
    },
  ];

  const terms = data?.terms.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <Typography.Title level={2}>Terms</Typography.Title>
      <Table
        columns={columns}
        dataSource={terms as AdminTermIndexQuery_terms_nodes[]}
        pagination={false}
        loading={loading}
      />
    </>
  );
}
