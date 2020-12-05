import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Button, Descriptions } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { TitleBar } from 'components';
import { createTermName } from 'helpers';

import { AssignProfessorModal } from 'sections/Admin/components';

import { AdminOfferingShowQuery } from './graphql/AdminOfferingShowQuery';
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
      enrollments {
        nodes {
          role
          user {
            name
          }
        }
      }
    }
  }
`;

export default function OfferingShow() {
  const [assignProfessorModalVisible, setAssignProfessorModalVisible] = useState(false);

  const { offeringId } = useParams<ParamType>();

  const { data } = useQuery<AdminOfferingShowQuery>(OFFERING, {
    variables: { id: offeringId },
  });

  const offering = data?.offering;

  if (!offering) {
    return null;
  }

  const professor = offering.enrollments?.nodes?.find(enrollment => enrollment?.role == 'professor')
    ?.user.name;

  return (
    <>
      <TitleBar title={`${offering.course.code} ${offering.section}`} />

      <Descriptions>
        <Descriptions.Item label="Section">{offering.section}</Descriptions.Item>
        <Descriptions.Item label="Course name">{offering.course.name}</Descriptions.Item>
        <Descriptions.Item label="Course code">{offering.course.code}</Descriptions.Item>
        <Descriptions.Item label="Term">
          {createTermName(offering.term.startDate, offering.term.endDate)}
        </Descriptions.Item>
        {professor && <Descriptions.Item label="Professor">{professor}</Descriptions.Item>}
      </Descriptions>
      {!professor && (
        <Button
          id="assign_professor"
          icon={<UserAddOutlined />}
          onClick={() => setAssignProfessorModalVisible(true)}
          className={styles.AssignProfButton}
        >
          Assign professor
        </Button>
      )}
      <AssignProfessorModal
        visible={assignProfessorModalVisible}
        offeringId={offeringId}
        onRequestClose={() => setAssignProfessorModalVisible(false)}
      />
    </>
  );
}
