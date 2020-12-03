/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminCourseIndexCourseDeletionMutation
// ====================================================

export interface AdminCourseIndexCourseDeletionMutation_deleteCourse_course {
  __typename: "Course";
  name: string;
  code: string;
}

export interface AdminCourseIndexCourseDeletionMutation_deleteCourse_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminCourseIndexCourseDeletionMutation_deleteCourse {
  __typename: "DeleteCoursePayload";
  course: AdminCourseIndexCourseDeletionMutation_deleteCourse_course | null;
  errors: AdminCourseIndexCourseDeletionMutation_deleteCourse_errors[];
}

export interface AdminCourseIndexCourseDeletionMutation {
  deleteCourse: AdminCourseIndexCourseDeletionMutation_deleteCourse | null;
}

export interface AdminCourseIndexCourseDeletionMutationVariables {
  id: string;
}
