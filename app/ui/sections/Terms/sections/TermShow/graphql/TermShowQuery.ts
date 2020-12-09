/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TermShowQuery
// ====================================================

export interface TermShowQuery_currentUser {
  __typename: "User";
  id: string;
  canSelfEnroll: boolean;
}

export interface TermShowQuery_terms_nodes_offerings_nodes_course {
  __typename: "Course";
  id: string;
  name: string;
  code: string;
}

export interface TermShowQuery_terms_nodes_offerings_nodes_enrollments_nodes_user {
  __typename: "User";
  id: string;
}

export interface TermShowQuery_terms_nodes_offerings_nodes_enrollments_nodes {
  __typename: "Enrollment";
  user: TermShowQuery_terms_nodes_offerings_nodes_enrollments_nodes_user;
}

export interface TermShowQuery_terms_nodes_offerings_nodes_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (TermShowQuery_terms_nodes_offerings_nodes_enrollments_nodes | null)[] | null;
}

export interface TermShowQuery_terms_nodes_offerings_nodes {
  __typename: "Offering";
  id: string;
  full: boolean;
  section: string;
  course: TermShowQuery_terms_nodes_offerings_nodes_course;
  enrollments: TermShowQuery_terms_nodes_offerings_nodes_enrollments;
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
  registrationDeadline: any;
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
   * Specific details about the current user.
   */
  currentUser: TermShowQuery_currentUser | null;
  /**
   * All terms in the system
   */
  terms: TermShowQuery_terms;
}
