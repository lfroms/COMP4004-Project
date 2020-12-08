/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: DeliverableShowQuery
// ====================================================

export interface DeliverableShowQuery_currentUser_enrollments_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
}

export interface DeliverableShowQuery_currentUser_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_currentUser_enrollments_nodes | null)[] | null;
}

export interface DeliverableShowQuery_currentUser {
  __typename: "User";
  id: string;
  enrollments: DeliverableShowQuery_currentUser_enrollments;
}

export interface DeliverableShowQuery_deliverable_offering_enrollments_nodes_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface DeliverableShowQuery_deliverable_offering_enrollments_nodes {
  __typename: "Enrollment";
  user: DeliverableShowQuery_deliverable_offering_enrollments_nodes_user;
}

export interface DeliverableShowQuery_deliverable_offering_enrollments {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_deliverable_offering_enrollments_nodes | null)[] | null;
}

export interface DeliverableShowQuery_deliverable_offering {
  __typename: "Offering";
  id: string;
  enrollments: DeliverableShowQuery_deliverable_offering_enrollments;
}

export interface DeliverableShowQuery_deliverable {
  __typename: "Deliverable";
  id: string;
  title: string;
  description: string;
  dueDate: any;
  weight: number;
  offering: DeliverableShowQuery_deliverable_offering;
}

export interface DeliverableShowQuery {
  /**
   * Specific details about the current user.
   */
  currentUser: DeliverableShowQuery_currentUser | null;
  /**
   * Specific details about a given deliverable.
   */
  deliverable: DeliverableShowQuery_deliverable | null;
}

export interface DeliverableShowQueryVariables {
  offeringId: string;
  deliverableId: string;
}
