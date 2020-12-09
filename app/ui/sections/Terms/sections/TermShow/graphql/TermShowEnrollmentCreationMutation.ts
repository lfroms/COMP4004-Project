/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TermShowEnrollmentCreationMutation
// ====================================================

export interface TermShowEnrollmentCreationMutation_createEnrollment_enrollment {
  __typename: "Enrollment";
  id: string;
}

export interface TermShowEnrollmentCreationMutation_createEnrollment_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface TermShowEnrollmentCreationMutation_createEnrollment {
  __typename: "CreateEnrollmentPayload";
  enrollment: TermShowEnrollmentCreationMutation_createEnrollment_enrollment | null;
  errors: TermShowEnrollmentCreationMutation_createEnrollment_errors[];
}

export interface TermShowEnrollmentCreationMutation {
  createEnrollment: TermShowEnrollmentCreationMutation_createEnrollment | null;
}

export interface TermShowEnrollmentCreationMutationVariables {
  userId: string;
  offeringId: string;
}
