/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GradeIndexCurrentUserQuery
// ====================================================

export interface GradeIndexCurrentUserQuery_currentUser {
  __typename: "User";
  id: string;
}

export interface GradeIndexCurrentUserQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: GradeIndexCurrentUserQuery_currentUser | null;
}
