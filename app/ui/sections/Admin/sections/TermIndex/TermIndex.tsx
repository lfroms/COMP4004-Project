import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Typography } from 'antd';
import { createFriendlyDate, createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { TermCreateModal } from 'sections/Admin/components';

import {
  AdminTermIndexQuery,
  AdminTermIndexQuery_terms_nodes,
} from './graphql/AdminTermIndexQuery';

import * as styles from './TermIndex.module.scss';

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
      <Row align="middle" gutter={12}>
        <Col flex={1}>
          <Typography.Title level={2}>Terms</Typography.Title>
        </Col>
        <Col>
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => setTermCreateModalVisible(true)}
            className={styles.AddTermButton}
          >
            New term
          </Button>
        </Col>
      </Row>

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
