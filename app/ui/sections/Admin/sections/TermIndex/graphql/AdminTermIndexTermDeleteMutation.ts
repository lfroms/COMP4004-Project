/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminTermIndexTermDeleteMutation
// ====================================================

export interface AdminTermIndexTermDeleteMutation_deleteTerm_term {
  __typename: "Term";
  id: string;
}

export interface AdminTermIndexTermDeleteMutation_deleteTerm_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminTermIndexTermDeleteMutation_deleteTerm {
  __typename: "DeleteTermPayload";
  term: AdminTermIndexTermDeleteMutation_deleteTerm_term | null;
  errors: AdminTermIndexTermDeleteMutation_deleteTerm_errors[];
}

export interface AdminTermIndexTermDeleteMutation {
  deleteTerm: AdminTermIndexTermDeleteMutation_deleteTerm | null;
}

export interface AdminTermIndexTermDeleteMutationVariables {
  id: string;
}
