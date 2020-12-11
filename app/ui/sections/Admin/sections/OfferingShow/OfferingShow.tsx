import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Descriptions, Tag, Typography } from 'antd';
import { CheckOutlined, UserAddOutlined } from '@ant-design/icons';
import { TitleBar } from 'components';
import { createFriendlyDate, createTermName } from 'helpers';
import { AssignProfessorModal } from 'sections/Admin/components';
import Table, { ColumnType } from 'antd/lib/table';

import {
  AdminOfferingShowQuery,
  AdminOfferingShowQuery_offering_enrollments_nodes,
} from './graphql/AdminOfferingShowQuery';

interface ParamType {
  offeringId: string;
}

const OFFERING = gql`
  query AdminOfferingShowQuery($id: ID!) {
    offering(id: $id) {
      id
      section
      capacity
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
          id
          role
          deletedAt
          finalGrade
          user {
            id
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

  const enrollments = data?.offering?.enrollments.nodes?.filter(Boolean) ?? [];

  const professor = offering.enrollments?.nodes?.find(enrollment => enrollment?.role == 'professor')
    ?.user.name;

  const columns: ColumnType<AdminOfferingShowQuery_offering_enrollments_nodes>[] = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      render: (text, record) => <Link to={`/admin/users/${record.user.id}`}>{text}</Link>,
      sorter: (first, second) => first.user.name.localeCompare(second.user.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: renderRoleTag,
    },
    {
      title: 'Status',
      render: (_value, record) => (
        <span>
          <Tag color={record.deletedAt ? 'red' : 'blue'}>
            {record.deletedAt ? 'Dropped' : 'Enrolled'}
          </Tag>

          {record.deletedAt ? (
            <Typography.Text type="secondary">{`as of ${createFriendlyDate(
              record.deletedAt
            )}`}</Typography.Text>
          ) : null}
        </span>
      ),
    },
    {
      title: 'Final grade',
      dataIndex: ['finalGrade'],
    },
  ];

  return (
    <>
      <TitleBar
        title={`${offering.course.code} ${offering.section}`}
        actions={[
          {
            elementId: 'assign_professor',
            icon: professor ? <CheckOutlined /> : <UserAddOutlined />,
            onClick: () => setAssignProfessorModalVisible(true),
            text: professor ? 'Professor assigned' : 'Assign professor',
            disabled: !!professor,
          },
        ]}
      />

      <Descriptions>
        <Descriptions.Item label="Course name">{offering.course.name}</Descriptions.Item>
        <Descriptions.Item label="Course code">{offering.course.code}</Descriptions.Item>
        <Descriptions.Item label="Section">{offering.section}</Descriptions.Item>
        <Descriptions.Item label="Capacity">{offering.capacity}</Descriptions.Item>
        <Descriptions.Item label="Term">
          {createTermName(offering.term.startDate, offering.term.endDate)}
        </Descriptions.Item>
        {professor && <Descriptions.Item label="Professor">{professor}</Descriptions.Item>}
      </Descriptions>
      <TitleBar.Secondary title="Enrollments" />
      <Table
        columns={columns}
        dataSource={enrollments as AdminOfferingShowQuery_offering_enrollments_nodes[]}
        pagination={false}
      />
      <AssignProfessorModal
        visible={assignProfessorModalVisible}
        offeringId={offeringId}
        onRequestClose={() => setAssignProfessorModalVisible(false)}
      />
    </>
  );
}

const renderRoleTag = (role: string) => {
  const label = role === 'student' ? 'Student' : 'Professor';
  const color = role === 'student' ? 'default' : 'purple';

  return <Tag color={color}>{label}</Tag>;
};
