/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Home
// ====================================================

export interface Home_currentUser {
  __typename: "User";
  name: string;
}

export interface Home {
  /**
   * Specific details about the current user.
   */
  currentUser: Home_currentUser | null;
}
