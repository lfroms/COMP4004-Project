/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOfferingModalMutation
// ====================================================

export interface CreateOfferingModalMutation_createOffering_offering {
  __typename: "Offering";
  id: string;
}

export interface CreateOfferingModalMutation_createOffering_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface CreateOfferingModalMutation_createOffering {
  __typename: "CreateOfferingPayload";
  offering: CreateOfferingModalMutation_createOffering_offering | null;
  errors: CreateOfferingModalMutation_createOffering_errors[];
}

export interface CreateOfferingModalMutation {
  createOffering: CreateOfferingModalMutation_createOffering | null;
}

export interface CreateOfferingModalMutationVariables {
  termId: string;
  courseId: string;
  section: string;
}
