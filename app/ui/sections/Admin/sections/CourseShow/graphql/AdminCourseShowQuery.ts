/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminCourseShowQuery
// ====================================================

export interface AdminCourseShowQuery_course_prerequisites_nodes {
  __typename: "Course";
  id: string;
  code: string;
}

export interface AdminCourseShowQuery_course_prerequisites {
  __typename: "CourseConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminCourseShowQuery_course_prerequisites_nodes | null)[] | null;
}

export interface AdminCourseShowQuery_course {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
  prerequisites: AdminCourseShowQuery_course_prerequisites;
}

export interface AdminCourseShowQuery {
  /**
   * Specific details about a given course.
   */
  course: AdminCourseShowQuery_course | null;
}

export interface AdminCourseShowQueryVariables {
  id: string;
}
