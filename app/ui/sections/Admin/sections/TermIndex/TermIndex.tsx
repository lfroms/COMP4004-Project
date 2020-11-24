import { gql, useQuery } from '@apollo/client';
import { Divider, Table } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  AdminTermIndexQuery,
  AdminTermIndexQuery_terms_nodes,
} from './graphql/AdminTermIndexQuery';

export default function TermIndex() {
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

  const { data } = useQuery<AdminTermIndexQuery>(ALL_TERMS);
  const history = useHistory();

  const columns = [
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Financial deadline',
      dataIndex: 'financialDeadline',
      key: 'financialDeadline',
    },
    {
      title: 'Withdrawal deadline',
      dataIndex: 'withdrawalDeadline',
      key: 'withdrawalDeadline',
    },
    {
      title: 'Registration deadline',
      dataIndex: 'registrationDeadline',
      key: 'registrationDeadline',
    },
  ];

  const terms = data?.terms.nodes?.filter(term => !!term) ?? [];

  return (
    <>
      <Divider orientation="left">Terms</Divider>
      <Table
        columns={columns}
        dataSource={terms as AdminTermIndexQuery_terms_nodes[]}
        pagination={false}
        onRow={record => ({
          onClick: () => history.push(`/admin/terms/${record.id}`),
        })}
      />
    </>
  );
}
