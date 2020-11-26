import { gql, useQuery } from '@apollo/client';
import { Descriptions, Divider, Tag } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { createFriendlyDate, createTermName } from 'helpers';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AdminTermShowQuery,
  AdminTermShowQuery_term_offerings_nodes,
} from './graphql/AdminTermShowQuery';

interface ParamType {
  termId: string;
}

const TERM = gql`
  query AdminTermShowQuery($id: ID!) {
    term(id: $id) {
      id
      startDate
      endDate
      financialDeadline
      registrationDeadline
      withdrawalDeadline
      offerings {
        nodes {
          id
          section
          course {
            id
            code
            name
          }
        }
      }
    }
  }
`;

export default function TermShow() {
  const { termId } = useParams<ParamType>();

  const { data, loading } = useQuery<AdminTermShowQuery>(TERM, {
    variables: { id: termId },
  });

  const term = data?.term;

  if (!term) {
    return null;
  }

  const columns: ColumnType<AdminTermShowQuery_term_offerings_nodes>[] = [
    {
      title: 'Section',
      dataIndex: 'section',
      render: (text, record) => (
        <Link to={`/admin/offerings/${record.id}`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        </Link>
      ),
      sorter: (first, second) => first.section.localeCompare(second.section),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course code',
      dataIndex: ['course', 'code'],
      render: (text, record) => <Link to={`/admin/courses/${record.course.id}`}>{text}</Link>,
      sorter: (first, second) => first.course.code.localeCompare(second.course.code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course name',
      dataIndex: ['course', 'name'],
      render: (text, record) => <Link to={`/admin/courses/${record.course.id}`}>{text}</Link>,
      sorter: (first, second) => first.course.name.localeCompare(second.course.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_text, record) => <Link to={`/admin/offerings/${record.id}`}>View</Link>,
    },
  ];

  return (
    <>
      <Divider orientation="left">{createTermName(term.startDate, term.endDate)} term</Divider>

      <Descriptions title="Term details">
        <Descriptions.Item label="Start date">
          {createFriendlyDate(term.startDate)}
        </Descriptions.Item>
        <Descriptions.Item label="End date">{createFriendlyDate(term.endDate)}</Descriptions.Item>
        <Descriptions.Item label="Financial desdline">
          {createFriendlyDate(term.financialDeadline)}
        </Descriptions.Item>
        <Descriptions.Item label="Registration deadline">
          {createFriendlyDate(term.registrationDeadline)}
        </Descriptions.Item>
        <Descriptions.Item label="Withdrawal deadline">
          {createFriendlyDate(term.withdrawalDeadline)}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Course offerings</Divider>

      <Table
        columns={columns}
        dataSource={term.offerings.nodes as AdminTermShowQuery_term_offerings_nodes[]}
        pagination={false}
        loading={loading}
      />
    </>
  );
}
