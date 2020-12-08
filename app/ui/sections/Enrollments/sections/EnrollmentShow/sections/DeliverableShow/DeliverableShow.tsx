import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { TitleBar } from 'components';
import { createFriendlyDate } from 'helpers';
import { Button, Card, Descriptions, Row, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { CheckCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import {
  DeliverableShowQuery,
  DeliverableShowQueryVariables,
  DeliverableShowQuery_deliverable_offering_enrollments_nodes,
} from './graphql/DeliverableShowQuery';

interface ParamType {
  offeringId: string;
  deliverableId: string;
}

const DELIVERABLE = gql`
  query DeliverableShowQuery($offeringId: ID!, $deliverableId: ID!) {
    currentUser {
      id
      enrollments(offeringId: $offeringId) {
        nodes {
          id
          role
        }
      }
    }
    deliverable(id: $deliverableId) {
      id
      title
      description
      dueDate
      weight
      offering {
        id
        enrollments(role: student) {
          nodes {
            id
            user {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export default function DeliverableShow() {
  const { deliverableId, offeringId } = useParams<ParamType>();
  const { data } = useQuery<DeliverableShowQuery, DeliverableShowQueryVariables>(DELIVERABLE, {
    variables: { offeringId, deliverableId },
  });

  const currentUserRole = data?.currentUser?.enrollments.nodes?.[0]?.role;
  const students = data?.deliverable?.offering.enrollments.nodes;

  // TODO: Implement their grade in the deliverable if it exists
  const columns: ColumnType<DeliverableShowQuery_deliverable_offering_enrollments_nodes>[] = [
    {
      title: 'Student',
      dataIndex: 'name',
    },
    {
      title: 'Submitted',
      dataIndex: 'submitted',
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

  const studentTableMarkup =
    currentUserRole === 'professor' ? (
      <Table
        dataSource={students as DeliverableShowQuery_deliverable_offering_enrollments_nodes[]}
        columns={columns}
      />
    ) : null;

  const deliverable = data?.deliverable;

  if (!deliverable) {
    return null;
  }

  return (
    <>
      <TitleBar
        title={`Deliverable: ${deliverable?.title}`}
        actions={[
          {
            elementId: 'new_submission',
            icon: <FileAddOutlined />,
            onClick: () => {},
            text: 'Add submission',
          },
        ]}
      />
      <Row gutter={16}>
        <Descriptions title="Deliverable details">
          <Descriptions.Item label="Due">
            {createFriendlyDate(deliverable?.dueDate)}
          </Descriptions.Item>
          {currentUserRole === 'student' && (
            <Descriptions.Item label="Grade">Grade</Descriptions.Item>
          )}
        </Descriptions>
      </Row>
      <Card title="Description" size="small">
        {deliverable?.description}
      </Card>
      {studentTableMarkup}
    </>
  );
}
