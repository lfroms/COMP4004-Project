/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OfferingIndexQuery
// ====================================================

export interface OfferingIndexQuery_term_offerings_nodes_course {
  __typename: "Course";
  id: string;
  name: string;
  code: string;
}

export interface OfferingIndexQuery_term_offerings_nodes {
  __typename: "Offering";
  id: string;
  section: string;
  course: OfferingIndexQuery_term_offerings_nodes_course;
}

export interface OfferingIndexQuery_term_offerings {
  __typename: "OfferingConnection";
  /**
   * A list of nodes.
   */
  nodes: (OfferingIndexQuery_term_offerings_nodes | null)[] | null;
}

export interface OfferingIndexQuery_term {
  __typename: "Term";
  startDate: any;
  endDate: any;
  offerings: OfferingIndexQuery_term_offerings;
}

export interface OfferingIndexQuery {
  /**
   * Specific details about a given term.
   */
  term: OfferingIndexQuery_term | null;
}

export interface OfferingIndexQueryVariables {
  termId: string;
}
