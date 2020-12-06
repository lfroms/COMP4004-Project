/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: EnrollmentIndexQuery
// ====================================================

export interface EnrollmentIndexQuery_currentUser_enrollments_nodes_offering_course {
  __typename: "Course";
  id: string;
  name: string;
  code: string;
}

export interface EnrollmentIndexQuery_currentUser_enrollments_nodes_offering {
  __typename: "Offering";
  id: string;
  section: string;
  course: EnrollmentIndexQuery_currentUser_enrollments_nodes_offering_course;
}

export interface EnrollmentIndexQuery_currentUser_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
  offering: EnrollmentIndexQuery_currentUser_enrollments_nodes_offering;
}

export interface EnrollmentIndexQuery_currentUser_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (EnrollmentIndexQuery_currentUser_enrollments_nodes | null)[] | null;
}

export interface EnrollmentIndexQuery_currentUser {
  __typename: "User";
  id: string;
  enrollments: EnrollmentIndexQuery_currentUser_enrollments;
}

export interface EnrollmentIndexQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: EnrollmentIndexQuery_currentUser | null;
}
