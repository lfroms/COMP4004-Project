/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminUserIndexUserApprovalMutation
// ====================================================

export interface AdminUserIndexUserApprovalMutation_updateUser_user {
  __typename: "User";
  id: string;
}

export interface AdminUserIndexUserApprovalMutation_updateUser_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminUserIndexUserApprovalMutation_updateUser {
  __typename: "UpdateUserPayload";
  user: AdminUserIndexUserApprovalMutation_updateUser_user | null;
  errors: AdminUserIndexUserApprovalMutation_updateUser_errors[];
}

export interface AdminUserIndexUserApprovalMutation {
  updateUser: AdminUserIndexUserApprovalMutation_updateUser | null;
}

export interface AdminUserIndexUserApprovalMutationVariables {
  id: string;
  approved?: boolean | null;
}
