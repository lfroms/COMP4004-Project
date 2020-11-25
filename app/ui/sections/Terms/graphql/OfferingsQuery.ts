/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OfferingsQuery
// ====================================================

export interface OfferingsQuery_terms_nodes {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface OfferingsQuery_terms {
  __typename: "TermConnection";
  /**
   * A list of nodes.
   */
  nodes: (OfferingsQuery_terms_nodes | null)[] | null;
}

export interface OfferingsQuery {
  /**
   * All terms in the system
   */
  terms: OfferingsQuery_terms;
}
