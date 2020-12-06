/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TermCurrentUserQuery
// ====================================================

export interface TermCurrentUserQuery_currentUser_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
}

export interface TermCurrentUserQuery_currentUser_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (TermCurrentUserQuery_currentUser_enrollments_nodes | null)[] | null;
}

export interface TermCurrentUserQuery_currentUser {
  __typename: "User";
  canSelfEnroll: boolean;
  enrollments: TermCurrentUserQuery_currentUser_enrollments;
}

export interface TermCurrentUserQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: TermCurrentUserQuery_currentUser | null;
}
