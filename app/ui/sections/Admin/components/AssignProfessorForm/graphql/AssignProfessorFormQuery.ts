/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AssignProfessorFormQuery
// ====================================================

export interface AssignProfessorFormQuery_users_nodes {
  __typename: "User";
  id: string;
  name: string;
}

export interface AssignProfessorFormQuery_users {
  __typename: "UserConnection";
  /**
   * A list of nodes.
   */
  nodes: (AssignProfessorFormQuery_users_nodes | null)[] | null;
}

export interface AssignProfessorFormQuery {
  /**
   * All users in the system.
   */
  users: AssignProfessorFormQuery_users;
}
