/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminGroupShowRemoveUserMutation
// ====================================================

export interface AdminGroupShowRemoveUserMutation_removeUserFromGroup_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminGroupShowRemoveUserMutation_removeUserFromGroup {
  __typename: "RemoveUserFromGroupPayload";
  errors: AdminGroupShowRemoveUserMutation_removeUserFromGroup_errors[];
}

export interface AdminGroupShowRemoveUserMutation {
  removeUserFromGroup: AdminGroupShowRemoveUserMutation_removeUserFromGroup | null;
}

export interface AdminGroupShowRemoveUserMutationVariables {
  userId: string;
  groupId: string;
}
