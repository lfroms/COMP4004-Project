/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AdminTermShowOfferingDeletionMutation
// ====================================================

export interface AdminTermShowOfferingDeletionMutation_deleteOffering_offering_course {
  __typename: "Course";
  name: string;
}

export interface AdminTermShowOfferingDeletionMutation_deleteOffering_offering {
  __typename: "Offering";
  course: AdminTermShowOfferingDeletionMutation_deleteOffering_offering_course;
  section: string;
}

export interface AdminTermShowOfferingDeletionMutation_deleteOffering {
  __typename: "DeleteOfferingPayload";
  offering: AdminTermShowOfferingDeletionMutation_deleteOffering_offering | null;
}

export interface AdminTermShowOfferingDeletionMutation {
  deleteOffering: AdminTermShowOfferingDeletionMutation_deleteOffering | null;
}

export interface AdminTermShowOfferingDeletionMutationVariables {
  id: string;
}
