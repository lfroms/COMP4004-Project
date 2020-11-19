/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDetailsQuery
// ====================================================

export interface UserDetailsQuery_user {
  __typename: "User";
  name: string;
  email: string;
  approved: boolean;
  admin: boolean;
}

export interface UserDetailsQuery {
  /**
   * Specific details about a given user.
   */
  user: UserDetailsQuery_user | null;
}

export interface UserDetailsQueryVariables {
  id: string;
}
