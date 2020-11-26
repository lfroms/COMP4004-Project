import { gql, useQuery } from '@apollo/client';
import { Divider, Table } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  AdminCourseIndexQuery,
  AdminCourseIndexQuery_courses_nodes,
} from './graphql/AdminCourseIndexQuery';

export default function CourseIndex() {
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

  const { data } = useQuery<AdminCourseIndexQuery>(ALL_COURSES);
  const history = useHistory();

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const courses = data?.courses.nodes?.filter(course => !!course) ?? [];

  return (
    <>
      <Divider orientation="left">Courses</Divider>
      <Table
        columns={columns}
        dataSource={courses as AdminCourseIndexQuery_courses_nodes[]}
        pagination={false}
        onRow={record => ({
          onClick: () => history.push(`/admin/courses/${record.id}`),
        })}
      />
    </>
  );
}
