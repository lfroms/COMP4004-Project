import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Divider, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

import {
  AdminOfferingIndexQuery,
  AdminOfferingIndexQuery_offerings_nodes,
} from './graphql/AdminOfferingIndexQuery';
import { createTermName } from 'helpers';

export default function OfferingIndex() {
  const ALL_OFFERINGS = gql`
    query AdminOfferingIndexQuery {
      offerings {
        nodes {
          id
          section
          course {
            id
            code
          }
          term {
            id
            startDate
            endDate
          }
        }
      }
    }
  `;

  const { data } = useQuery<AdminOfferingIndexQuery>(ALL_OFFERINGS);

  const columns = [
    {
      title: 'Section',
      dataIndex: 'section',
      render: (text: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/offerings/${record.id}`}>
          <Tag color="blue" style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        </Link>
      ),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      render: (_value: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/courses/${record.course.id}`}>{record.course.code}</Link>
      ),
    },
    {
      title: 'Term',
      dataIndex: 'term',
      render: (_value: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/terms/${record.term.id}`}>
          {createTermName(record.term.startDate, record.term.endDate)}
        </Link>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      // NOTE: @lfroms
      // For some reason the type checker doesn't understand 'right' even though it is a valid input.
      fixed: 'right' as const,
      width: 100,
      render: (_text: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/offerings/${record.id}`}>View</Link>
      ),
    },
  ];

  const offerings = data?.offerings.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <Divider orientation="left">All Course Offerings</Divider>
      <Table
        columns={columns}
        dataSource={offerings as AdminOfferingIndexQuery_offerings_nodes[]}
        pagination={false}
      />
    </>
  );
}
