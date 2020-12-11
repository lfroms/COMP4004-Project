/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: EnrollmentShowQuery
// ====================================================

export interface EnrollmentShowQuery_offering_course {
  __typename: "Course";
  id: string;
  name: string;
  code: string;
}

export interface EnrollmentShowQuery_offering_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface EnrollmentShowQuery_offering_currentEnrollment_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
}

export interface EnrollmentShowQuery_offering_currentEnrollment {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (EnrollmentShowQuery_offering_currentEnrollment_nodes | null)[] | null;
}

export interface EnrollmentShowQuery_offering {
  __typename: "Offering";
  id: string;
  section: string;
  course: EnrollmentShowQuery_offering_course;
  term: EnrollmentShowQuery_offering_term;
  currentEnrollment: EnrollmentShowQuery_offering_currentEnrollment;
}

export interface EnrollmentShowQuery {
  /**
   * Specific details about a given offering.
   */
  offering: EnrollmentShowQuery_offering | null;
}

export interface EnrollmentShowQueryVariables {
  offeringId: string;
  userId: string;
}
