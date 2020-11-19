/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUserIndexQuery
// ====================================================

export interface AdminUserIndexQuery_users_nodes {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
}

export interface AdminUserIndexQuery_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminUserIndexQuery_users_nodes | null)[] | null;
}

export interface AdminUserIndexQuery {
  /**
   * All users in the system.
   */
  users: AdminUserIndexQuery_users;
}
