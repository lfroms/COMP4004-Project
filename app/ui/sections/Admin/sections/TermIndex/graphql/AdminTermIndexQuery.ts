/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTermIndexQuery
// ====================================================

export interface AdminTermIndexQuery_terms_nodes {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
  registrationDeadline: any;
  withdrawalDeadline: any;
}

export interface AdminTermIndexQuery_terms {
  __typename: "TermConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminTermIndexQuery_terms_nodes | null)[] | null;
}

export interface AdminTermIndexQuery {
  /**
   * All terms in the system
   */
  terms: AdminTermIndexQuery_terms;
}
