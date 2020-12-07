/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: ParticipantIndexQuery
// ====================================================

export interface ParticipantIndexQuery_currentUser_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
}

export interface ParticipantIndexQuery_currentUser_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (ParticipantIndexQuery_currentUser_enrollments_nodes | null)[] | null;
}

export interface ParticipantIndexQuery_currentUser {
  __typename: "User";
  id: string;
  enrollments: ParticipantIndexQuery_currentUser_enrollments;
}

export interface ParticipantIndexQuery_offering_enrollments_nodes_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ParticipantIndexQuery_offering_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
  deletedAt: any | null;
  user: ParticipantIndexQuery_offering_enrollments_nodes_user;
}

export interface ParticipantIndexQuery_offering_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (ParticipantIndexQuery_offering_enrollments_nodes | null)[] | null;
}

export interface ParticipantIndexQuery_offering {
  __typename: "Offering";
  id: string;
  enrollments: ParticipantIndexQuery_offering_enrollments;
}

export interface ParticipantIndexQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: ParticipantIndexQuery_currentUser | null;
  /**
   * Specific details about a given offering.
   */
  offering: ParticipantIndexQuery_offering | null;
}

export interface ParticipantIndexQueryVariables {
  offeringId: string;
}
