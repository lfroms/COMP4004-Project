/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGroupEditFormQuery
// ====================================================

export interface UserGroupEditFormQuery_users_nodes {
  __typename: "User";
  id: string;
  name: string;
}

export interface UserGroupEditFormQuery_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (UserGroupEditFormQuery_users_nodes | null)[] | null;
}

export interface UserGroupEditFormQuery {
  /**
   * All users in the system.
   */
  users: UserGroupEditFormQuery_users;
}
