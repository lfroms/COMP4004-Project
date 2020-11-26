/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CourseShowQuery
// ====================================================

export interface AdminCourseShowQuery_prerequisites_nodes {
  __typename: "Course";
  id: string;
  code: string;
}

export interface AdminCourseShowQuery_prerequisites {
  __typename: "CourseConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminCourseShowQuery_prerequisites_nodes | null)[] | null;
}

export interface AdminCourseShowQuery_course {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
  prerequisites: AdminCourseShowQuery_prerequisites;
}

export interface AdminCourseShowQuery {
  /**
   * A specific course
   */
  course: AdminCourseShowQuery_course
}
