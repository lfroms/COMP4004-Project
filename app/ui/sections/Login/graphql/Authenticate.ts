/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Authenticate
// ====================================================

export interface Authenticate_authenticate {
  __typename: "AuthenticatePayload";
  token: string | null;
}

export interface Authenticate {
  authenticate: Authenticate_authenticate | null;
}

export interface AuthenticateVariables {
  email: string;
  password: string;
}
