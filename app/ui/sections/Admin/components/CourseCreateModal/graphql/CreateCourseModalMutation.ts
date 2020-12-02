/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCourseModalMutation
// ====================================================

export interface CreateCourseModalMutation_createCourse_course {
  __typename: "Course";
  id: string;
}

export interface CreateCourseModalMutation_createCourse_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface CreateCourseModalMutation_createCourse {
  __typename: "CreateCoursePayload";
  course: CreateCourseModalMutation_createCourse_course | null;
  errors: CreateCourseModalMutation_createCourse_errors[];
}

export interface CreateCourseModalMutation {
  createCourse: CreateCourseModalMutation_createCourse | null;
}

export interface CreateCourseModalMutationVariables {
  code: string;
  name: string;
  prerequisiteIds?: string[] | null;
}
