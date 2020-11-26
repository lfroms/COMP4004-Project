/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TermShowQuery
// ====================================================

export interface TermShowQuery_terms_nodes_offerings_nodes_course {
  __typename: "Course";
  id: string;
  name: string;
  code: string;
}

export interface TermShowQuery_terms_nodes_offerings_nodes {
  __typename: "Offering";
  id: string;
  section: string;
  course: TermShowQuery_terms_nodes_offerings_nodes_course;
}

export interface TermShowQuery_terms_nodes_offerings {
  __typename: "OfferingConnection";
  /**
   * A list of nodes.
   */
  nodes: (TermShowQuery_terms_nodes_offerings_nodes | null)[] | null;
}

export interface TermShowQuery_terms_nodes {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
  offerings: TermShowQuery_terms_nodes_offerings;
}

export interface TermShowQuery_terms {
  __typename: "TermConnection";
  /**
   * A list of nodes.
   */
  nodes: (TermShowQuery_terms_nodes | null)[] | null;
}

export interface TermShowQuery {
  /**
   * All terms in the system
   */
  terms: TermShowQuery_terms;
}
