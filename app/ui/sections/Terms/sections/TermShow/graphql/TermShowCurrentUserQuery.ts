/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TermShowCurrentUserQuery
// ====================================================

export interface TermShowCurrentUserQuery_currentUser {
  __typename: "User";
  id: string;
  canSelfEnroll: boolean;
}

export interface TermShowCurrentUserQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: TermShowCurrentUserQuery_currentUser | null;
}
