import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { EnrollmentsDeliverableQuery } from './graphql/EnrollmentsDeliverableQuery';
import { TitleBar } from 'components';
import { createFriendlyDate } from 'helpers';
import { Button, Card, Col, Row, Statistic, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { CheckCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import { EnrollmentsUserRoleQuery } from './graphql/EnrollmentsUserRoleQuery';
import {
  EnrollmentsOfferingEnrollmentsQuery,
  EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes,
} from './graphql/EnrollmentsOfferingEnrollmentsQuery';

interface ParamType {
  offeringId: string;
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

const USER_ROLE = gql`
  query EnrollmentsUserRoleQuery($offeringId: ID) {
    currentUser {
      enrollments(offeringId: $offeringId) {
        nodes {
          role
        }
      }
    }
  }
`;

const OFFERING_ENROLLMENTS = gql`
  query EnrollmentsOfferingEnrollmentsQuery($offeringId: ID!) {
    offering(id: $offeringId) {
      enrollments {
        nodes {
          role
          user {
            id
            name
          }
        }
      }
    }
  }
`;

export default function DeliverableShow() {
  const { deliverableId, offeringId } = useParams<ParamType>();
  const { data } = useQuery<EnrollmentsDeliverableQuery>(SINGLE_DELIVERABLE, {
    variables: { id: deliverableId },
  });
  const { data: roleData } = useQuery<EnrollmentsUserRoleQuery>(USER_ROLE, {
    variables: { offeringId: offeringId },
  });
  const { data: enrollmentsData } = useQuery<EnrollmentsOfferingEnrollmentsQuery>(
    OFFERING_ENROLLMENTS,
    {
      variables: { offeringId: offeringId },
    }
  );

  const role = roleData?.currentUser?.enrollments.nodes?.[0]?.role;

  const students = enrollmentsData?.offering?.enrollments?.nodes?.filter(
    enrollment => enrollment?.role === 'student'
  );

  const studentEnrollments = students?.map(student => {
    return {
      student: student?.user.name,
      submitted: false,
      grade: 0,
    };
  });

  const columns: ColumnType<EnrollmentsOfferingEnrollmentsQuery_offering_enrollments_nodes>[] = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Submitted',
      dataIndex: 'submitted',
      key: 'submitted',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: record => {
        return (
          <Button
            id={`add-grade-button-${record.user.id}`}
            style={{ color: '#6BCC3C', borderColor: '#6BCC3C' }}
            icon={<CheckCircleOutlined />}
          >
            Add grade
          </Button>
        );
      },
    },
  ];

  const roleSpecificMarkup =
    role === 'professor' ? (
      <Table dataSource={studentEnrollments} columns={columns} />
    ) : (
      <Button icon={<FileAddOutlined />}>Add submission</Button>
    );

  const deliverable = data?.deliverable;

  return (
    <>
      <TitleBar title={`Deliverable: ${deliverable?.title}`} />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Due" value={createFriendlyDate(deliverable?.dueDate)} />
        </Col>
        {role === 'student' && (
          <Col span={12}>
            <Statistic title="Grade" value="grade" suffix="/ 100" />
          </Col>
        )}
      </Row>
      <Card title="Description" size="small">
        {deliverable?.description}
      </Card>
      {roleSpecificMarkup}
    </>
  );
}
