import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Descriptions, Tag } from 'antd';
import { Loading, TitleBar } from 'components';

import { AdminUserShowQuery } from './graphql/AdminUserShowQuery';

interface ParamType {
  userId: string;
}

const SINGLE_USER = gql`
  query AdminUserShowQuery($id: ID!) {
    user(id: $id) {
      id
      name
      email
      approved
      admin
      fees
      enrollments {
        nodes {
          id
        }
      }
    }
  }
`;

export default function UserDetails() {
  const { userId } = useParams<ParamType>();

  const { data, loading } = useQuery<AdminUserShowQuery>(SINGLE_USER, {
    variables: { id: userId },
  });

  const user = data?.user;

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <TitleBar title={user?.name} />
      <Descriptions bordered layout="vertical">
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Type">{renderTypeTag(user.admin)}</Descriptions.Item>
        <Descriptions.Item label="Status">{renderStatusTag(user.approved)}</Descriptions.Item>
        <Descriptions.Item label="Balance">${user.balance}</Descriptions.Item>
        <Descriptions.Item label="Enrollments">
          {user.enrollments.nodes?.length ?? 0}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

const renderStatusTag = (approved: boolean) => {
  const label = approved ? 'Approved' : 'Pending';
  const color = approved ? 'green' : 'orange';

  return <Tag color={color}>{label}</Tag>;
};

const renderTypeTag = (admin: boolean) => {
  const label = admin ? 'Admin' : 'Standard';
  const color = admin ? 'magenta' : 'geekblue';

  return <Tag color={color}>{label}</Tag>;
};
