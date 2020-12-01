/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTermModalMutation
// ====================================================

export interface CreateTermModalMutation_createTerm_term {
  __typename: "Term";
  id: string;
}

export interface CreateTermModalMutation_createTerm {
  __typename: "CreateTermPayload";
  term: CreateTermModalMutation_createTerm_term | null;
}

export interface CreateTermModalMutation {
  createTerm: CreateTermModalMutation_createTerm | null;
}

export interface CreateTermModalMutationVariables {
  startDate: any;
  endDate: any;
  registrationDeadline: any;
  withdrawalDeadline: any;
  financialDeadline: any;
}
