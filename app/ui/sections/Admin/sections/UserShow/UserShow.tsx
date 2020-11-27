import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AdminUserShowQuery } from './graphql/AdminUserShowQuery';
import { Descriptions, Typography } from 'antd';

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
    }
  }
`;

export default function UserDetails() {
  const { userId } = useParams<ParamType>();

  const { data } = useQuery<AdminUserShowQuery>(SINGLE_USER, {
    variables: { id: userId },
  });
  const user = data?.user;

  return (
    <>
      <Typography.Title level={2}>{user?.name}</Typography.Title>
      <Descriptions>
        <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
        <Descriptions.Item label="Type">{user?.admin ? 'Admin' : 'Standard'}</Descriptions.Item>
      </Descriptions>
    </>
  );
}
