import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { Button, Descriptions, Tag } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { TitleBar } from 'components';
import { createTermName } from 'helpers';

import { AssignProfessorModal } from 'sections/Admin/components';

import {
  AdminOfferingShowQuery,
  AdminOfferingShowQuery_offering_enrollments_nodes,
} from './graphql/AdminOfferingShowQuery';
import * as styles from './OfferingShow.module.scss';
import Table, { ColumnType } from 'antd/lib/table';

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
  ];

  return (
    <>
      <TitleBar title={`${offering.course.code} ${offering.section}`} />

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
