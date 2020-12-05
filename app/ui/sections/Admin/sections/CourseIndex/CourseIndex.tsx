import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag, message } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { CourseCreateModal } from 'sections/Admin/components';
import { TitleBar } from 'components';

import {
  AdminCourseIndexQuery,
  AdminCourseIndexQuery_courses_nodes,
} from './graphql/AdminCourseIndexQuery';
import {
  AdminCourseIndexCourseDeletionMutation,
  AdminCourseIndexCourseDeletionMutationVariables,
} from './graphql/AdminCourseIndexCourseDeletionMutation';

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

const DELETE_COURSE = gql`
  mutation AdminCourseIndexCourseDeletionMutation($id: ID!) {
    deleteCourse(input: { id: $id }) {
      course {
        name
        code
      }
      errors {
        message
      }
    }
  }
`;

export default function CourseIndex() {
  const [courseCreateModalVisible, setCourseCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<AdminCourseIndexQuery>(ALL_COURSES);
  const [deleteCourse, { loading: deleteLoading }] = useMutation<
    AdminCourseIndexCourseDeletionMutation,
    AdminCourseIndexCourseDeletionMutationVariables
  >(DELETE_COURSE, {
    refetchQueries: [{ query: ALL_COURSES }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteCourse({ variables: { id } });
    data?.deleteCourse?.errors.forEach(error => message.error(error.message));
  };

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
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: (_value, record) => (
        <Popconfirm
          placement="rightBottom"
          title="Are you sure you want to delete this course?"
          onConfirm={handleConfirmDelete(record.id)}
          okText="Confirm"
          okButtonProps={{ loading: deleteLoading }}
          cancelText="Cancel"
        >
          <Button danger id="delete_course" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const courses = data?.courses.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Courses"
        actions={[
          {
            elementId: 'new_course',
            icon: <AppstoreAddOutlined />,
            onClick: () => setCourseCreateModalVisible(true),
            text: 'New course',
          },
        ]}
      />

      <Table
        id="course_index"
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
