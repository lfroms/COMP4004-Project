/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserModalMutation
// ====================================================

export interface CreateUserModalMutation_createUser_user {
  __typename: "User";
  id: string;
}

export interface CreateUserModalMutation_createUser {
  __typename: "CreateUserPayload";
  user: CreateUserModalMutation_createUser_user;
}

export interface CreateUserModalMutation {
  createUser: CreateUserModalMutation_createUser | null;
}

export interface CreateUserModalMutationVariables {
  name: string;
  email: string;
  password: string;
  admin?: boolean | null;
}
