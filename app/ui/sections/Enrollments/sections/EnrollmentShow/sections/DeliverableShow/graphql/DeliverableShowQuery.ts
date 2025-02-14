/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentRole } from "./../../../../../../../graphql/global-types";

// ====================================================
// GraphQL query operation: DeliverableShowQuery
// ====================================================

export interface DeliverableShowQuery_deliverable_currentSubmission_nodes_grade {
  __typename: "Grade";
  id: string;
  value: number;
}

export interface DeliverableShowQuery_deliverable_currentSubmission_nodes {
  __typename: "Submission";
  id: string;
  grade: DeliverableShowQuery_deliverable_currentSubmission_nodes_grade | null;
}

export interface DeliverableShowQuery_deliverable_currentSubmission {
  __typename: "SubmissionConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_deliverable_currentSubmission_nodes | null)[] | null;
}

export interface DeliverableShowQuery_deliverable_offering_currentEnrollment_nodes {
  __typename: "Enrollment";
  id: string;
  role: EnrollmentRole;
}

export interface DeliverableShowQuery_deliverable_offering_currentEnrollment {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_deliverable_offering_currentEnrollment_nodes | null)[] | null;
}

export interface DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions_nodes_grade {
  __typename: "Grade";
  id: string;
  value: number;
  comment: string;
}

export interface DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions_nodes {
  __typename: "Submission";
  id: string;
  attachmentUrl: string;
  grade: DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions_nodes_grade | null;
}

export interface DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions {
  __typename: "SubmissionConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions_nodes | null)[] | null;
}

export interface DeliverableShowQuery_deliverable_offering_students_nodes_user {
  __typename: "User";
  id: string;
  name: string;
  submissions: DeliverableShowQuery_deliverable_offering_students_nodes_user_submissions;
}

export interface DeliverableShowQuery_deliverable_offering_students_nodes {
  __typename: "Enrollment";
  id: string;
  user: DeliverableShowQuery_deliverable_offering_students_nodes_user;
}

export interface DeliverableShowQuery_deliverable_offering_students {
  __typename: "EnrollmentConnection";
  /**
   * A list of nodes.
   */
  nodes: (DeliverableShowQuery_deliverable_offering_students_nodes | null)[] | null;
}

export interface DeliverableShowQuery_deliverable_offering {
  __typename: "Offering";
  id: string;
  currentEnrollment: DeliverableShowQuery_deliverable_offering_currentEnrollment;
  students: DeliverableShowQuery_deliverable_offering_students;
}

export interface DeliverableShowQuery_deliverable {
  __typename: "Deliverable";
  id: string;
  title: string;
  description: string;
  dueDate: any;
  dueDatePassed: boolean;
  hasSubmissions: boolean;
  weight: number;
  currentSubmission: DeliverableShowQuery_deliverable_currentSubmission;
  offering: DeliverableShowQuery_deliverable_offering;
}

export interface DeliverableShowQuery {
  /**
   * Specific details about a given deliverable.
   */
  deliverable: DeliverableShowQuery_deliverable | null;
}

export interface DeliverableShowQueryVariables {
  userId: string;
  deliverableId: string;
}
