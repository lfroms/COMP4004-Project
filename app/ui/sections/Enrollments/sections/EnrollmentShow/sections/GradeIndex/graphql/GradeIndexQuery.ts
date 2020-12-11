/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: GradeIndexQuery
// ====================================================

export interface GradeIndexQuery_offering_currentEnrollment_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
}

export interface GradeIndexQuery_offering_currentEnrollment {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (GradeIndexQuery_offering_currentEnrollment_nodes | null)[] | null;
}

export interface GradeIndexQuery_offering_deliverables_nodes_submissions_nodes_grade {
  __typename: "Grade";
  id: string;
  value: number;
}

export interface GradeIndexQuery_offering_deliverables_nodes_submissions_nodes {
  __typename: "Submission";
  id: string;
  grade: GradeIndexQuery_offering_deliverables_nodes_submissions_nodes_grade | null;
}

export interface GradeIndexQuery_offering_deliverables_nodes_submissions {
  __typename: "SubmissionConnection";
  /**
   * A list of nodes.
   */
  nodes: (GradeIndexQuery_offering_deliverables_nodes_submissions_nodes | null)[] | null;
}

export interface GradeIndexQuery_offering_deliverables_nodes {
  __typename: "Deliverable";
  id: string;
  title: string;
  weight: number;
  submissions: GradeIndexQuery_offering_deliverables_nodes_submissions;
}

export interface GradeIndexQuery_offering_deliverables {
  __typename: "DeliverableConnection";
  /**
   * A list of nodes.
   */
  nodes: (GradeIndexQuery_offering_deliverables_nodes | null)[] | null;
}

export interface GradeIndexQuery_offering {
  __typename: "Offering";
  id: string;
  currentEnrollment: GradeIndexQuery_offering_currentEnrollment;
  deliverables: GradeIndexQuery_offering_deliverables;
}

export interface GradeIndexQuery {
  /**
   * Specific details about a given offering.
   */
  offering: GradeIndexQuery_offering | null;
}

export interface GradeIndexQueryVariables {
  userId: string;
  offeringId: string;
}
