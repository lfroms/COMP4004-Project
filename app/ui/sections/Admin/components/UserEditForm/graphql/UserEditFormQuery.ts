/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserEditFormQuery
// ====================================================

export interface UserEditFormQuery_groups_nodes {
  __typename: "Group";
  id: string;
  name: string;
}

export interface UserEditFormQuery_groups {
  __typename: "GroupConnection";
  /**
   * A list of nodes.
   */
  nodes: (UserEditFormQuery_groups_nodes | null)[] | null;
}

export interface UserEditFormQuery {
  /**
   * All groups in the system.
   */
  groups: UserEditFormQuery_groups;
}
