/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DashboardQuery
// ====================================================

export interface DashboardQuery_offering_deliverables_nodes {
  __typename: "Deliverable";
  id: string;
  title: string;
  description: string;
  dueDate: any;
  weight: number;
}

export interface DashboardQuery_offering_deliverables {
  __typename: "DeliverableConnection";
  /**
   * A list of nodes.
   */
  nodes: (DashboardQuery_offering_deliverables_nodes | null)[] | null;
}

export interface DashboardQuery_offering {
  __typename: "Offering";
  id: string;
  deliverables: DashboardQuery_offering_deliverables;
}

export interface DashboardQuery {
  /**
   * Specific details about a given offering.
   */
  offering: DashboardQuery_offering | null;
}

export interface DashboardQueryVariables {
  offeringId: string;
}
