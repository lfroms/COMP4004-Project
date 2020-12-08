/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: EnrollmentsOfferingEnrollmentsQuery
// ====================================================

export interface EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes {
  __typename: "Enrollment";
  role: EnrollmentRole;
  user: EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes_user;
}

export interface EnrollmentsOfferingEnrollmentsQuery_offering_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes | null)[] | null;
}

export interface EnrollmentsOfferingEnrollmentsQuery_offering {
  __typename: "Offering";
  enrollments: EnrollmentsOfferingEnrollmentsQuery_offering_enrollments;
}

export interface EnrollmentsOfferingEnrollmentsQuery {
  /**
   * Specific details about a given offering.
   */
  offering: EnrollmentsOfferingEnrollmentsQuery_offering | null;
}

export interface EnrollmentsOfferingEnrollmentsQueryVariables {
  offeringId: string;
}
