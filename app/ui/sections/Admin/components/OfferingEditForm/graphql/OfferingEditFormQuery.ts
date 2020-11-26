/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OfferingEditFormQuery
// ====================================================

export interface OfferingEditFormQuery_courses_nodes {
  __typename: "Course";
  id: string;
  code: string;
}

export interface OfferingEditFormQuery_courses {
  __typename: "CourseConnection";
  /**
   * A list of nodes.
   */
  nodes: (OfferingEditFormQuery_courses_nodes | null)[] | null;
}

export interface OfferingEditFormQuery_terms_nodes {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface OfferingEditFormQuery_terms {
  __typename: "TermConnection";
  /**
   * A list of nodes.
   */
  nodes: (OfferingEditFormQuery_terms_nodes | null)[] | null;
}

export interface OfferingEditFormQuery {
  /**
   * All courses in the system.
   */
  courses: OfferingEditFormQuery_courses;
  /**
   * All terms in the system
   */
  terms: OfferingEditFormQuery_terms;
}
