/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserContextQuery
// ====================================================

export interface CurrentUserContextQuery_currentUser {
  __typename: "User";
  id: string;
}

export interface CurrentUserContextQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: CurrentUserContextQuery_currentUser | null;
}
