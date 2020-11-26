import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Descriptions, Divider } from 'antd';

import { AdminOfferingShowQuery } from './graphql/AdminOfferingShowQuery';
import { createTermName } from 'helpers';

interface ParamType {
  offeringId: string;
}

const OFFERING = gql`
  query AdminOfferingShowQuery($id: ID!) {
    offering(id: $id) {
      id
      section
      course {
        id
        code
        name
      }
      term {
        id
        startDate
        endDate
      }
    }
  }
`;

export default function OfferingShow() {
  const { offeringId } = useParams<ParamType>();

  const { data } = useQuery<AdminOfferingShowQuery>(OFFERING, {
    variables: { id: offeringId },
  });

  const offering = data?.offering;

  if (!offering) {
    return null;
  }

  return (
    <>
      <Divider orientation="left">
        {offering.course.code} {offering.section}
      </Divider>
      <Descriptions title="Offering details">
        <Descriptions.Item label="Section">{offering.section}</Descriptions.Item>
        <Descriptions.Item label="Course name">{offering.course.name}</Descriptions.Item>
        <Descriptions.Item label="Course code">{offering.course.code}</Descriptions.Item>
        <Descriptions.Item label="Term">
          {createTermName(offering.term.startDate, offering.term.endDate)}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
