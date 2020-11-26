import { gql, useQuery } from '@apollo/client';
import { Descriptions, PageHeader } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { AdminCourseShowQuery } from './graphql/AdminCourseShowQuery';

interface ParamType {
  courseId: string;
}

export default function CourseShow() {
  const { courseId } = useParams<ParamType>();
  const history = useHistory();

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

  if (!data) {
    return <div>Course not found</div>;
  }

  const course = data.course;

  const prerequisites = course.prerequisites.nodes;

  const prereqCodes =
    prerequisites && prerequisites.length > 0
      ? prerequisites.map(prereq => prereq?.code)
      : ['None'];

  return (
    <>
      <PageHeader
        title={`${course.code}`}
        onBack={() => history.push(`/admin/courses/${courseId}`)}
      />
      <Descriptions>
        <Descriptions.Item label="Title">{course.name}</Descriptions.Item>
        <Descriptions.Item label="Prerequisites">{prereqCodes.toString()}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
