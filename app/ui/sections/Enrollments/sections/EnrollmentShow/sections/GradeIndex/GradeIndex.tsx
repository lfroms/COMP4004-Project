import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { TitleBar } from 'components';
import { Link, useParams } from 'react-router-dom';

import { GradeIndexCurrentUserQuery } from './graphql/GradeIndexCurrentUserQuery';
import {
  GradeIndexQuery,
  GradeIndexQueryVariables,
  GradeIndexQuery_offering_deliverables_nodes,
} from './graphql/GradeIndexQuery';

interface ParamType {
  offeringId: string;
}

const CURRENT_USER = gql`
  query GradeIndexCurrentUserQuery {
    currentUser {
      id
    }
  }
`;

const GRADES = gql`
  query GradeIndexQuery($userId: ID!, $offeringId: ID!) {
    offering(id: $offeringId) {
      id
      deliverables {
        nodes {
          id
          title
          weight
          submissions(userId: $userId) {
            nodes {
              id
              grade {
                id
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default function GradeIndex() {
  const { offeringId } = useParams<ParamType>();

  const { data: currentUserData, loading: currentUserLoading } = useQuery<
    GradeIndexCurrentUserQuery
  >(CURRENT_USER);

  const { data, loading } = useQuery<GradeIndexQuery, GradeIndexQueryVariables>(GRADES, {
    skip: !currentUserData?.currentUser?.id,
    variables: {
      // Otherwise value will never be used as this query is skipped if the current user ID is not present.
      userId: currentUserData?.currentUser?.id ?? '0',
      offeringId,
    },
  });

  const columns: ColumnType<GradeIndexQuery_offering_deliverables_nodes>[] = [
    {
      title: 'Deliverable',
      dataIndex: 'title',
      sorter: (first, second) => first.title.localeCompare(second.title),
      sortDirections: ['ascend', 'descend'],
      render: (value, record) => <Link to={`deliverables/${record.id}`}>{value}</Link>,
    },
    {
      title: 'Grade',
      dataIndex: ['submissions', 'nodes', 0, 'grade'],
      render: (_value, record) => {
        const firstSubmission = record.submissions.nodes?.slice()[0];

        if (!firstSubmission) {
          return <Tag color="warning">Pending Submission</Tag>;
        }

        if (!firstSubmission.grade) {
          return <Tag color="processing">Submitted</Tag>;
        }

        return firstSubmission.grade.value;
      },
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      sorter: (first, second) => first.weight - second.weight,
      sortDirections: ['ascend', 'descend'],
      render: (_value, record) => record.weight.toFixed(2),
    },
  ];

  return (
    <>
      <TitleBar title="Grades" />

      <Table
        columns={columns}
        dataSource={
          (data?.offering?.deliverables.nodes ??
            []) as GradeIndexQuery_offering_deliverables_nodes[]
        }
        pagination={false}
        loading={loading || currentUserLoading}
      />
    </>
  );
}
