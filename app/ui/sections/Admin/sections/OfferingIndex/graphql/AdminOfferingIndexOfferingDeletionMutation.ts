/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminOfferingIndexOfferingDeletionMutation
// ====================================================

export interface AdminOfferingIndexOfferingDeletionMutation_deleteOffering_offering_course {
  __typename: "Course";
  name: string;
}

export interface AdminOfferingIndexOfferingDeletionMutation_deleteOffering_offering {
  __typename: "Offering";
  course: AdminOfferingIndexOfferingDeletionMutation_deleteOffering_offering_course;
  section: string;
}

export interface AdminOfferingIndexOfferingDeletionMutation_deleteOffering_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface AdminOfferingIndexOfferingDeletionMutation_deleteOffering {
  __typename: "DeleteOfferingPayload";
  offering: AdminOfferingIndexOfferingDeletionMutation_deleteOffering_offering | null;
  errors: AdminOfferingIndexOfferingDeletionMutation_deleteOffering_errors[];
}

export interface AdminOfferingIndexOfferingDeletionMutation {
  deleteOffering: AdminOfferingIndexOfferingDeletionMutation_deleteOffering | null;
}

export interface AdminOfferingIndexOfferingDeletionMutationVariables {
  id: string;
}
