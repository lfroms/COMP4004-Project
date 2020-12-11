/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EnrollmentIndexUnenrollMutation
// ====================================================

export interface EnrollmentIndexUnenrollMutation_deleteEnrollment_enrollment {
  __typename: "Enrollment";
  id: string;
  deletedAt: any | null;
}

export interface EnrollmentIndexUnenrollMutation_deleteEnrollment_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface EnrollmentIndexUnenrollMutation_deleteEnrollment {
  __typename: "DeleteEnrollmentPayload";
  enrollment: EnrollmentIndexUnenrollMutation_deleteEnrollment_enrollment | null;
  errors: EnrollmentIndexUnenrollMutation_deleteEnrollment_errors[];
}

export interface EnrollmentIndexUnenrollMutation {
  deleteEnrollment: EnrollmentIndexUnenrollMutation_deleteEnrollment | null;
}

export interface EnrollmentIndexUnenrollMutationVariables {
  id: string;
}
