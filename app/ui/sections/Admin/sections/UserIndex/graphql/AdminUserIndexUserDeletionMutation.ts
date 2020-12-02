/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminUserIndexUserDeletionMutation
// ====================================================

export interface AdminUserIndexUserDeletionMutation_deleteUser_user {
  __typename: "User";
  name: string;
  email: string;
}

export interface AdminUserIndexUserDeletionMutation_deleteUser_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminUserIndexUserDeletionMutation_deleteUser {
  __typename: "DeleteUserPayload";
  user: AdminUserIndexUserDeletionMutation_deleteUser_user | null;
  errors: AdminUserIndexUserDeletionMutation_deleteUser_errors[];
}

export interface AdminUserIndexUserDeletionMutation {
  deleteUser: AdminUserIndexUserDeletionMutation_deleteUser | null;
}

export interface AdminUserIndexUserDeletionMutationVariables {
  id: string;
}
