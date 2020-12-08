/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: EnrollmentsUserRoleQuery
// ====================================================

export interface EnrollmentsUserRoleQuery_currentUser_enrollments_nodes {
  __typename: "Enrollment";
  role: EnrollmentRole;
}

export interface EnrollmentsUserRoleQuery_currentUser_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (EnrollmentsUserRoleQuery_currentUser_enrollments_nodes | null)[] | null;
}

export interface EnrollmentsUserRoleQuery_currentUser {
  __typename: "User";
  enrollments: EnrollmentsUserRoleQuery_currentUser_enrollments;
}

export interface EnrollmentsUserRoleQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: EnrollmentsUserRoleQuery_currentUser | null;
}

export interface EnrollmentsUserRoleQueryVariables {
  offeringId?: string | null;
}
