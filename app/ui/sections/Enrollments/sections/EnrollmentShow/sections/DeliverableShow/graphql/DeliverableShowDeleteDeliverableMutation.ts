/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeliverableShowDeleteDeliverableMutation
// ====================================================

export interface DeliverableShowDeleteDeliverableMutation_deleteDeliverable_deliverable {
  __typename: "Deliverable";
  id: string;
}

export interface DeliverableShowDeleteDeliverableMutation_deleteDeliverable_errors {
  __typename: "UserError";
  /**
   * A description of the error
   */
  message: string;
}

export interface DeliverableShowDeleteDeliverableMutation_deleteDeliverable {
  __typename: "DeleteDeliverablePayload";
  deliverable: DeliverableShowDeleteDeliverableMutation_deleteDeliverable_deliverable | null;
  errors: DeliverableShowDeleteDeliverableMutation_deleteDeliverable_errors[];
}

export interface DeliverableShowDeleteDeliverableMutation {
  deleteDeliverable: DeliverableShowDeleteDeliverableMutation_deleteDeliverable | null;
}

export interface DeliverableShowDeleteDeliverableMutationVariables {
  id: string;
}
