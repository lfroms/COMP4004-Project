import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, Tag, Typography } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';

import {
  AdminCourseIndexQuery,
  AdminCourseIndexQuery_courses_nodes,
} from './graphql/AdminCourseIndexQuery';

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
  const { data, loading } = useQuery<AdminCourseIndexQuery>(ALL_COURSES);

  if (!data) {
    return <div>Courses not found</div>;
  }

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

  const courses = data.courses.nodes?.filter(course => !!course) ?? [];

  return (
    <>
      <Typography.Title level={2}>All courses</Typography.Title>{' '}
      <Table
        columns={columns}
        dataSource={courses as AdminCourseIndexQuery_courses_nodes[]}
        pagination={false}
        loading={loading}
      />
    </>
  );
}
