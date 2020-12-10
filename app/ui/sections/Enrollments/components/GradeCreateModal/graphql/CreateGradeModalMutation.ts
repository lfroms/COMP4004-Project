/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGradeModalMutation
// ====================================================

export interface CreateGradeModalMutation_createGrade_grade {
  __typename: "Grade";
  id: string;
}

export interface CreateGradeModalMutation_createGrade_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface CreateGradeModalMutation_createGrade {
  __typename: "CreateGradePayload";
  grade: CreateGradeModalMutation_createGrade_grade | null;
  errors: CreateGradeModalMutation_createGrade_errors[];
}

export interface CreateGradeModalMutation {
  createGrade: CreateGradeModalMutation_createGrade | null;
}

export interface CreateGradeModalMutationVariables {
  submissionId: string;
  value: number;
  comment: string;
}
