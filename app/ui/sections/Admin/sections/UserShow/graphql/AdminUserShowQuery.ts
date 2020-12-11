/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUserShowQuery
// ====================================================

export interface AdminUserShowQuery_user_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
}

export interface AdminUserShowQuery_user_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminUserShowQuery_user_enrollments_nodes | null)[] | null;
}

export interface AdminUserShowQuery_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
  fees: number;
  enrollments: AdminUserShowQuery_user_enrollments;
}

export interface AdminUserShowQuery {
  /**
   * Specific details about a given user.
   */
  user: AdminUserShowQuery_user | null;
}

export interface AdminUserShowQueryVariables {
  id: string;
}
