import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserDetailsQuery } from './graphql/UserDetailsQuery';
import { Col, PageHeader, Row, Statistic } from 'antd';

interface ParamType {
  userId: string;
}

export default function UserDetails() {
  const { userId } = useParams<ParamType>();
  const history = useHistory();

  const SINGLE_USER = gql`
    query UserDetailsQuery($id: ID!) {
      user(id: $id) {
        name
        email
        approved
        admin
      }
    }
  `;

  const { data } = useQuery<UserDetailsQuery>(SINGLE_USER, {
    variables: { id: userId },
  });
  const user = data?.user;
  console.log(userId);
  console.log(user);

  return (
    <>
      <PageHeader
        title={user?.name}
        subTitle={user?.approved ? 'Approved' : 'Pending'}
        onBack={() => history.push('/admin/users')}
      />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Email" value={`${user?.email}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Type" value={user?.admin ? 'Admin' : 'Standard'} />
        </Col>
      </Row>
    </>
  );
}
