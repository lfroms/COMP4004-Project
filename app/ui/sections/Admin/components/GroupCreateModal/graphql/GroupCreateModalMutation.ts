/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupCreateModalMutation
// ====================================================

export interface GroupCreateModalMutation_createGroup_group {
  __typename: "Group";
  id: string;
}

export interface GroupCreateModalMutation_createGroup_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface GroupCreateModalMutation_createGroup {
  __typename: "CreateGroupPayload";
  group: GroupCreateModalMutation_createGroup_group | null;
  errors: GroupCreateModalMutation_createGroup_errors[];
}

export interface GroupCreateModalMutation {
  createGroup: GroupCreateModalMutation_createGroup | null;
}

export interface GroupCreateModalMutationVariables {
  name: string;
  canSelfEnroll: boolean;
}
