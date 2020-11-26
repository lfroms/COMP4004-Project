/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTermShowQuery
// ====================================================

export interface AdminTermShowQuery_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
  financialDeadline: any;
  registrationDeadline: any;
  withdrawalDeadline: any;
}

export interface AdminTermShowQuery {
  /**
   * Specific details about a given term.
   */
  term: AdminTermShowQuery_term | null;
}

export interface AdminTermShowQueryVariables {
  id: string;
}
