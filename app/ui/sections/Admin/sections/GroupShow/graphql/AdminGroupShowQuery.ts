/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminGroupShowQuery
// ====================================================

export interface AdminGroupShowQuery_group_users_nodes {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
}

export interface AdminGroupShowQuery_group_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminGroupShowQuery_group_users_nodes | null)[] | null;
}

export interface AdminGroupShowQuery_group {
  __typename: "Group";
  id: string;
  name: string;
  canSelfEnroll: boolean;
  users: AdminGroupShowQuery_group_users;
}

export interface AdminGroupShowQuery {
  /**
   * Specific details about a given group.
   */
  group: AdminGroupShowQuery_group | null;
}

export interface AdminGroupShowQueryVariables {
  id: string;
}
