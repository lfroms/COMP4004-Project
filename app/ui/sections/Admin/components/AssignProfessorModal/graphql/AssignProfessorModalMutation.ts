/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignProfessorModalMutation
// ====================================================

export interface AssignProfessorModalMutation_createEnrollment_enrollment_user {
  __typename: "User";
  id: string;
}

export interface AssignProfessorModalMutation_createEnrollment_enrollment {
  __typename: "Enrollment";
  id: string;
  user: AssignProfessorModalMutation_createEnrollment_enrollment_user;
}

export interface AssignProfessorModalMutation_createEnrollment {
  __typename: "CreateEnrollmentPayload";
  enrollment: AssignProfessorModalMutation_createEnrollment_enrollment | null;
}

export interface AssignProfessorModalMutation {
  createEnrollment: AssignProfessorModalMutation_createEnrollment | null;
}

export interface AssignProfessorModalMutationVariables {
  role: string;
  userId: string;
  offeringId: string;
}
