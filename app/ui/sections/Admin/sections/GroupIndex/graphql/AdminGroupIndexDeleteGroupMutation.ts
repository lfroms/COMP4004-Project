/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminGroupIndexDeleteGroupMutation
// ====================================================

export interface AdminGroupIndexDeleteGroupMutation_deleteGroup_group {
  __typename: "Group";
  id: string;
}

export interface AdminGroupIndexDeleteGroupMutation_deleteGroup_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminGroupIndexDeleteGroupMutation_deleteGroup {
  __typename: "DeleteGroupPayload";
  group: AdminGroupIndexDeleteGroupMutation_deleteGroup_group | null;
  errors: AdminGroupIndexDeleteGroupMutation_deleteGroup_errors[];
}

export interface AdminGroupIndexDeleteGroupMutation {
  deleteGroup: AdminGroupIndexDeleteGroupMutation_deleteGroup | null;
}

export interface AdminGroupIndexDeleteGroupMutationVariables {
  id: string;
}
