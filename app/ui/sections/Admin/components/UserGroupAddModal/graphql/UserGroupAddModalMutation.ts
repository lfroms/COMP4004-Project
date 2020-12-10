/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserGroupAddModalMutation
// ====================================================

export interface UserGroupAddModalMutation_addUserToGroup_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface UserGroupAddModalMutation_addUserToGroup {
  __typename: "AddUserToGroupPayload";
  errors: UserGroupAddModalMutation_addUserToGroup_errors[];
}

export interface UserGroupAddModalMutation {
  addUserToGroup: UserGroupAddModalMutation_addUserToGroup | null;
}

export interface UserGroupAddModalMutationVariables {
  userId: string;
  groupId: string;
}
