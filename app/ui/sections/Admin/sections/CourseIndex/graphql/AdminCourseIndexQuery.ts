/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminCourseIndexQuery
// ====================================================

export interface AdminCourseIndexQuery_courses_nodes {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
}

export interface AdminCourseIndexQuery_courses {
  __typename: "CourseConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminCourseIndexQuery_courses_nodes | null)[] | null;
}

export interface AdminCourseIndexQuery {
  /**
   * All courses in the system.
   */
  courses: AdminCourseIndexQuery_courses;
}
