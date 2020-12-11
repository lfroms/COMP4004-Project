/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: FinalGradeModalMutation
// ====================================================

export interface FinalGradeModalMutation_updateEnrollment_enrollment {
  __typename: "Enrollment";
  id: string;
  finalGrade: string | null;
}

export interface FinalGradeModalMutation_updateEnrollment_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface FinalGradeModalMutation_updateEnrollment {
  __typename: "UpdateEnrollmentPayload";
  enrollment: FinalGradeModalMutation_updateEnrollment_enrollment | null;
  errors: FinalGradeModalMutation_updateEnrollment_errors[];
}

export interface FinalGradeModalMutation {
  updateEnrollment: FinalGradeModalMutation_updateEnrollment | null;
}

export interface FinalGradeModalMutationVariables {
  enrollmentId: string;
  finalGrade: string;
}
