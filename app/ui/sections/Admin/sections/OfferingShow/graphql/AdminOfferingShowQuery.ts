/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminOfferingShowQuery
// ====================================================

export interface AdminOfferingShowQuery_offering_course {
  __typename: "Course";
  id: string;
  code: string;
  name: string;
}

export interface AdminOfferingShowQuery_offering_term {
  __typename: "Term";
  id: string;
  startDate: any;
  endDate: any;
}

export interface AdminOfferingShowQuery_offering {
  __typename: "Offering";
  id: string;
  section: string;
  course: AdminOfferingShowQuery_offering_course;
  term: AdminOfferingShowQuery_offering_term;
}

export interface AdminOfferingShowQuery {
  /**
   * Specific details about a given offering.
   */
  offering: AdminOfferingShowQuery_offering | null;
}

export interface AdminOfferingShowQueryVariables {
  id: string;
}
