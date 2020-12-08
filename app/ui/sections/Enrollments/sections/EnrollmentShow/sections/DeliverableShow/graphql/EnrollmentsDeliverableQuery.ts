/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EnrollmentsDeliverableQuery
// ====================================================

export interface EnrollmentsDeliverableQuery_deliverable {
  __typename: "Deliverable";
  title: string;
  description: string;
  dueDate: any;
  weight: number;
}

export interface EnrollmentsDeliverableQuery {
  /**
   * Specific details about a given deliverable.
   */
  deliverable: EnrollmentsDeliverableQuery_deliverable | null;
}

export interface EnrollmentsDeliverableQueryVariables {
  id: string;
}
