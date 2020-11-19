import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AdminUserShowQuery } from './graphql/AdminUserShowQuery';
import { Col, PageHeader, Row, Statistic } from 'antd';

interface ParamType {
  userId: string;
}

export default function UserDetails() {
  const { userId } = useParams<ParamType>();
  const history = useHistory();

  const SINGLE_USER = gql`
    query AdminUserShowQuery($id: ID!) {
      user(id: $id) {
        name
        email
        approved
        admin
      }
    }
  `;

  const { data } = useQuery<AdminUserShowQuery>(SINGLE_USER, {
    variables: { id: userId },
  });
  const user = data?.user;

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
