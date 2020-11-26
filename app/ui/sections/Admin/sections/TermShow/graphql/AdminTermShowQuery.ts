/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTermShowQuery
// ====================================================

export interface AdminTermShowQuery_term_offerings_nodes_course {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
}

export interface AdminTermShowQuery_term_offerings_nodes {
  __typename: "Offering";
  id: string;
  section: string;
  course: AdminTermShowQuery_term_offerings_nodes_course;
}

export interface AdminTermShowQuery_term_offerings {
  __typename: "OfferingConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminTermShowQuery_term_offerings_nodes | null)[] | null;
}

export interface AdminTermShowQuery_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
  financialDeadline: any;
  registrationDeadline: any;
  withdrawalDeadline: any;
  offerings: AdminTermShowQuery_term_offerings;
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
