import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tag, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { createTermName } from 'helpers';
import { OfferingCreateModal } from 'sections/Admin/components';

import {
  AdminOfferingIndexQuery,
  AdminOfferingIndexQuery_offerings_nodes,
} from './graphql/AdminOfferingIndexQuery';

import * as styles from './OfferingIndex.module.scss';

const ALL_OFFERINGS = gql`
  query AdminOfferingIndexQuery {
    offerings {
      nodes {
        id
        section
        course {
          id
          code
        }
        term {
          id
          startDate
          endDate
        }
      }
    }
  }
`;

export default function OfferingIndex() {
  const [offeringCreateModalVisible, setOfferingCreateModalVisible] = useState(false);
  const { data, loading } = useQuery<AdminOfferingIndexQuery>(ALL_OFFERINGS);

  const columns: ColumnType<AdminOfferingIndexQuery_offerings_nodes>[] = [
    {
      title: 'Section',
      dataIndex: 'section',
      render: (text, record) => (
        <Link to={`/admin/offerings/${record.id}`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        </Link>
      ),
      sorter: (first, second) => first.section.localeCompare(second.section),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course',
      dataIndex: ['course', 'code'],
      render: (text, record) => <Link to={`/admin/courses/${record.course.id}`}>{text}</Link>,
      sorter: (first, second) => first.course.code.localeCompare(second.course.code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Term',
      dataIndex: 'term',
      render: (text, record) => (
        <Link to={`/admin/terms/${record.term.id}`}>
          {createTermName(record.term.startDate, record.term.endDate)}
        </Link>
      ),
      sorter: (first, second) =>
        new Date(first.term.startDate).getTime() - new Date(second.term.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_text, record) => <Link to={`/admin/offerings/${record.id}`}>View</Link>,
    },
  ];

  const offerings = data?.offerings.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <Row align="middle" gutter={12}>
        <Col flex={1}>
          <Typography.Title level={2}>All course offerings</Typography.Title>
        </Col>
        <Col>
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => setOfferingCreateModalVisible(true)}
            className={styles.AddOfferingButton}
          >
            New course offering
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={offerings as AdminOfferingIndexQuery_offerings_nodes[]}
        pagination={false}
        loading={loading}
      />

      <OfferingCreateModal
        visible={offeringCreateModalVisible}
        onRequestClose={() => setOfferingCreateModalVisible(false)}
      />
    </>
  );
}
