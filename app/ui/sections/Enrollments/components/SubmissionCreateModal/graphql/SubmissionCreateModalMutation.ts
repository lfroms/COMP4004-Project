/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmissionCreateModalMutation
// ====================================================

export interface SubmissionCreateModalMutation_createSubmission_submission {
  __typename: "Submission";
  id: string;
}

export interface SubmissionCreateModalMutation_createSubmission_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface SubmissionCreateModalMutation_createSubmission {
  __typename: "CreateSubmissionPayload";
  submission: SubmissionCreateModalMutation_createSubmission_submission | null;
  errors: SubmissionCreateModalMutation_createSubmission_errors[];
}

export interface SubmissionCreateModalMutation {
  createSubmission: SubmissionCreateModalMutation_createSubmission | null;
}

export interface SubmissionCreateModalMutationVariables {
  deliverableId: string;
  attachmentUrl: string;
}
