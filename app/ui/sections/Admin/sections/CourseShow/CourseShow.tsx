import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Descriptions, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { AdminCourseShowQuery } from './graphql/AdminCourseShowQuery';

interface ParamType {
  courseId: string;
}

export default function CourseShow() {
  const { courseId } = useParams<ParamType>();

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

  const { data } = useQuery<AdminCourseShowQuery>(SINGLE_COURSE, {
    variables: { id: courseId },
  });

  const course = data?.course;
  
  if (!course) {
    return null;
  }

  const prerequisites = course.prerequisites.nodes;

  const prereqCodes =
    prerequisites && prerequisites.length > 0
      ? prerequisites.map(prereq => prereq?.code)
      : ['None'];

  return (
    <>
      <Typography.Title level={2}>{course.code}</Typography.Title>

      <Descriptions>
        <Descriptions.Item label="Title">{course.name}</Descriptions.Item>
        <Descriptions.Item label="Prerequisites">{prereqCodes.toString()}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
