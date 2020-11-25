import { gql, useQuery } from '@apollo/client';
import { Col, PageHeader, Row, Statistic } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AdminTermShowQuery } from './graphql/AdminTermShowQuery';

interface ParamType {
  termId: string;
}

export default function TermShow() {
  const { termId } = useParams<ParamType>();
  const history = useHistory();

  const SINGLE_TERM = gql`
    query AdminTermShowQuery($id: ID!) {
      term(id: $id) {
        id
        startDate
        endDate
        financialDeadline
        registrationDeadline
        withdrawalDeadline
      }
    }
  `;

  const { data } = useQuery<AdminTermShowQuery>(SINGLE_TERM, {
    variables: { id: termId },
  });
  const term = data?.term;

  console.log(term);

  return (
    <>
      <PageHeader title={`Term ${termId}`} onBack={() => history.push('/admin/terms')} />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Start date" value={term?.startDate} />
        </Col>
        <Col span={12}>
          <Statistic title="End date" value={term?.endDate} />
        </Col>
        <Col span={12}>
          <Statistic title="Financial deadline" value={term?.financialDeadline} />
        </Col>
        <Col span={12}>
          <Statistic title="Registration deadline" value={term?.registrationDeadline} />
        </Col>
        <Col span={12}>
          <Statistic title="Withdrawal deadline" value={term?.withdrawalDeadline} />
        </Col>
      </Row>
    </>
  );
}
