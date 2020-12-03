import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button, Descriptions, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import { AdminOfferingShowQuery } from './graphql/AdminOfferingShowQuery';
import { createTermName } from 'helpers';
import * as styles from './OfferingShow.module.scss';

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
      <Typography.Title level={2}>
        {offering.course.code} {offering.section}
      </Typography.Title>

      <Descriptions>
        <Descriptions.Item label="Section">{offering.section}</Descriptions.Item>
        <Descriptions.Item label="Course name">{offering.course.name}</Descriptions.Item>
        <Descriptions.Item label="Course code">{offering.course.code}</Descriptions.Item>
        <Descriptions.Item label="Term">
          {createTermName(offering.term.startDate, offering.term.endDate)}
        </Descriptions.Item>

      </Descriptions>
      <Button
        id="assign_professor"
        icon={<UserAddOutlined />}
        // onClick={() => setCourseCreateModalVisible(true)}
        className={styles.AssignProfButton}
      >
        Assign prof
      </Button>
    </>
  );
}
