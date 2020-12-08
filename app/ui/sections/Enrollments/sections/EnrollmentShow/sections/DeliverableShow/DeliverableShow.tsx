import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { EnrollmentsDeliverableQuery } from './graphql/EnrollmentsDeliverableQuery';
import { TitleBar } from 'components';

interface ParamType {
  deliverableId: string;
}

const SINGLE_DELIVERABLE = gql`
  query EnrollmentsDeliverableQuery($id: ID!) {
    deliverable(id: $id) {
      title
      description
      dueDate
      weight
    }
  }
`;

export default function DeliverableShow() {
  const { deliverableId } = useParams<ParamType>();

  const { data } = useQuery<EnrollmentsDeliverableQuery>(SINGLE_DELIVERABLE, {
    variables: { id: deliverableId },
  });

  const deliverable = data?.deliverable;

  return (
    <>
      <TitleBar title={deliverable?.title} />
    </>
  );
}
