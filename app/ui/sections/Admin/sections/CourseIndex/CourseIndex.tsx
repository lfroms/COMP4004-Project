import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Tag, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { CourseCreateModal } from 'sections/Admin/components';

import {
  AdminCourseIndexQuery,
  AdminCourseIndexQuery_courses_nodes,
} from './graphql/AdminCourseIndexQuery';

import * as styles from './CourseIndex.module.scss';

const ALL_COURSES = gql`
  query AdminCourseIndexQuery {
    courses {
      nodes {
        id
        code
        name
      }
    }
  }
`;

export default function CourseIndex() {
  const [courseCreateModalVisible, setCourseCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<AdminCourseIndexQuery>(ALL_COURSES);

  const columns: ColumnType<AdminCourseIndexQuery_courses_nodes>[] = [
    {
      title: 'Code',
      dataIndex: 'code',
      render: (text, record) => (
        <Link to={`/admin/courses/${record.id}`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        </Link>
      ),
      sorter: (first, second) => first.code.localeCompare(second.code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Title',
      dataIndex: 'name',
      render: (text, record) => <Link to={`/admin/courses/${record.id}`}>{text}</Link>,
      sorter: (first, second) => first.name.localeCompare(second.name),
      sortDirections: ['ascend', 'descend'],
    },
  ];

  const courses = data?.courses.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <Row align="middle" gutter={12}>
        <Col flex={1}>
          <Typography.Title level={2}>All courses</Typography.Title>{' '}
        </Col>
        <Col>
          <Button
            icon={<AppstoreAddOutlined />}
            onClick={() => setCourseCreateModalVisible(true)}
            className={styles.AddCourseButton}
          >
            New course
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={courses as AdminCourseIndexQuery_courses_nodes[]}
        pagination={false}
        loading={loading}
      />

      <CourseCreateModal
        visible={courseCreateModalVisible}
        onRequestClose={() => setCourseCreateModalVisible(false)}
      />
    </>
  );
}
