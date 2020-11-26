/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CourseEditFormQuery
// ====================================================

export interface CourseEditFormQuery_courses_nodes {
  __typename: "Course";
  id: string;
  code: string;
}

export interface CourseEditFormQuery_courses {
  __typename: "CourseConnection";
  /**
   * A list of nodes.
   */
  nodes: (CourseEditFormQuery_courses_nodes | null)[] | null;
}

export interface CourseEditFormQuery {
  /**
   * All courses in the system.
   */
  courses: CourseEditFormQuery_courses;
}
