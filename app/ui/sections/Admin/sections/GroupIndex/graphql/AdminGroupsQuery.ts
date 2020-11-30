/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminGroupsQuery
// ====================================================

export interface AdminGroupsQuery_groups_nodes_users_nodes {
  __typename: "User";
  id: string;
}

export interface AdminGroupsQuery_groups_nodes_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminGroupsQuery_groups_nodes_users_nodes | null)[] | null;
}

export interface AdminGroupsQuery_groups_nodes {
  __typename: "Group";
  id: string;
  name: string;
  users: AdminGroupsQuery_groups_nodes_users;
}

export interface AdminGroupsQuery_groups {
  __typename: "GroupConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminGroupsQuery_groups_nodes | null)[] | null;
}

export interface AdminGroupsQuery {
  /**
   * All groups in the system.
   */
  groups: AdminGroupsQuery_groups;
}
