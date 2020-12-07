/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDeliverableModalMutation
// ====================================================

export interface CreateDeliverableModalMutation_createDeliverable_deliverable {
  __typename: "Deliverable";
  id: string;
}

export interface CreateDeliverableModalMutation_createDeliverable_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface CreateDeliverableModalMutation_createDeliverable {
  __typename: "CreateDeliverablePayload";
  deliverable: CreateDeliverableModalMutation_createDeliverable_deliverable | null;
  errors: CreateDeliverableModalMutation_createDeliverable_errors[];
}

export interface CreateDeliverableModalMutation {
  createDeliverable: CreateDeliverableModalMutation_createDeliverable | null;
}

export interface CreateDeliverableModalMutationVariables {
  title: string;
  description: string;
  weight: number;
  dueDate: any;
  offeringId: string;
}
