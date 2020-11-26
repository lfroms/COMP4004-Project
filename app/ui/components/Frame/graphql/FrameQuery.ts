/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FrameQuery
// ====================================================

export interface FrameQuery_currentUser {
  __typename: "User";
  admin: boolean;
}

export interface FrameQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: FrameQuery_currentUser | null;
}
