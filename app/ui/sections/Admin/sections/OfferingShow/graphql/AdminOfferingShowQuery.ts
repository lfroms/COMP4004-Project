/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: AdminOfferingShowQuery
// ====================================================

export interface AdminOfferingShowQuery_offering_course {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
}

export interface AdminOfferingShowQuery_offering_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface AdminOfferingShowQuery_offering_enrollments_nodes_user {
  __typename: "User";
  name: string;
}

export interface AdminOfferingShowQuery_offering_enrollments_nodes {
  __typename: "Enrollment";
  role: EnrollmentRole;
  user: AdminOfferingShowQuery_offering_enrollments_nodes_user;
}

export interface AdminOfferingShowQuery_offering_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (AdminOfferingShowQuery_offering_enrollments_nodes | null)[] | null;
}

export interface AdminOfferingShowQuery_offering {
  __typename: "Offering";
  id: string;
  section: string;
  capacity: number;
  course: AdminOfferingShowQuery_offering_course;
  term: AdminOfferingShowQuery_offering_term;
  enrollments: AdminOfferingShowQuery_offering_enrollments;
}

export interface AdminOfferingShowQuery {
  /**
   * Specific details about a given offering.
   */
  offering: AdminOfferingShowQuery_offering | null;
}

export interface AdminOfferingShowQueryVariables {
  id: string;
}
