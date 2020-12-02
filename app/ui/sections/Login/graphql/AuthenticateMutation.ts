/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AuthenticateMutation
// ====================================================

export interface AuthenticateMutation_authenticate_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AuthenticateMutation_authenticate {
  __typename: "AuthenticatePayload";
  token: string | null;
  errors: AuthenticateMutation_authenticate_errors[];
}

export interface AuthenticateMutation {
  authenticate: AuthenticateMutation_authenticate | null;
}

export interface AuthenticateMutationVariables {
  email: string;
  password: string;
}
