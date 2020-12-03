/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegistrationMutation
// ====================================================

export interface RegistrationMutation_registerUser_user {
  __typename: "User";
  id: string;
}

export interface RegistrationMutation_registerUser_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface RegistrationMutation_registerUser {
  __typename: "RegisterUserPayload";
  user: RegistrationMutation_registerUser_user | null;
  errors: RegistrationMutation_registerUser_errors[];
}

export interface RegistrationMutation {
  registerUser: RegistrationMutation_registerUser | null;
}

export interface RegistrationMutationVariables {
  name: string;
  email: string;
  password: string;
}
