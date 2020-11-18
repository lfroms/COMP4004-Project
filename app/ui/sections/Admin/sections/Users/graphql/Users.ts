/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_edges_node {
  __typename: "User";
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
}

export interface Users_users_edges {
  __typename: "UserEdge";
  /**
   * The item at the end of the edge.
   */
  node: Users_users_edges_node | null;
}

export interface Users_users {
  __typename: "UserConnection";
  /**
   * A list of edges.
   */
  edges: (Users_users_edges | null)[] | null;
}

export interface Users {
  /**
   * All users in the system.
   */
  users: Users_users | null;
}
