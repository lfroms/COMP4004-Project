/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminUsersQuery
// ====================================================

export interface AdminUsersQuery_users_nodes {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
}

export interface AdminUsersQuery_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminUsersQuery_users_nodes | null)[] | null;
}

export interface AdminUsersQuery {
  /**
   * All users in the system.
   */
  users: AdminUsersQuery_users;
}
