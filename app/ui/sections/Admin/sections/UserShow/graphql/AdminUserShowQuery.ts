/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUserShowQuery
// ====================================================

export interface AdminUserShowQuery_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
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
