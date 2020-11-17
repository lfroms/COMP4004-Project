/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser {
  __typename: "User";
  name: string;
}

export interface CurrentUser {
  /**
   * Specific details about the current user.
   */
  currentUser: CurrentUser_currentUser | null;
}
