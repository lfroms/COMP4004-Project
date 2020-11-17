/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeQuery
// ====================================================

export interface HomeQuery_currentUser {
  __typename: "User";
  name: string;
}

export interface HomeQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: HomeQuery_currentUser | null;
}
