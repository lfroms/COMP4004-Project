import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import { TitleBar } from 'components';

import { AdminCourseShowQuery } from './graphql/AdminCourseShowQuery';

interface ParamType {
  courseId: string;
}

const SINGLE_COURSE = gql`
  query AdminCourseShowQuery($id: ID!) {
    course(id: $id) {
      id
      code
      name
      prerequisites {
        nodes {
          id
          code
        }
      }
    }
  }
`;

export default function CourseShow() {
  const { courseId } = useParams<ParamType>();

  const { data } = useQuery<AdminCourseShowQuery>(SINGLE_COURSE, {
    variables: { id: courseId },
  });

  const course = data?.course;

  if (!course) {
    return null;
  }

  const prerequisites = course.prerequisites.nodes;

  const prerequisiteCodes = prerequisites?.length
    ? prerequisites.map(prerequisite => prerequisite?.code).join(', ')
    : 'None';

  return (
    <>
      <TitleBar title={course.code} />

      <Descriptions>
        <Descriptions.Item label="Title">{course.name}</Descriptions.Item>
        <Descriptions.Item label="Prerequisites">{prerequisiteCodes}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
