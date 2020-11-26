/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminOfferingIndexQuery
// ====================================================

export interface AdminOfferingIndexQuery_offerings_nodes_course {
  __typename: "Course";
  id: string;
  code: string;
}

export interface AdminOfferingIndexQuery_offerings_nodes_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface AdminOfferingIndexQuery_offerings_nodes {
  __typename: "Offering";
  id: string;
  section: string;
  course: AdminOfferingIndexQuery_offerings_nodes_course;
  term: AdminOfferingIndexQuery_offerings_nodes_term;
}

export interface AdminOfferingIndexQuery_offerings {
  __typename: "OfferingConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminOfferingIndexQuery_offerings_nodes | null)[] | null;
}

export interface AdminOfferingIndexQuery {
  /**
   * All offerings in the system.
   */
  offerings: AdminOfferingIndexQuery_offerings;
}
