import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Divider, Table, Tag } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { createTermName } from 'helpers';

import {
  AdminOfferingIndexQuery,
  AdminOfferingIndexQuery_offerings_nodes,
} from './graphql/AdminOfferingIndexQuery';

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

  const { data, loading } = useQuery<AdminOfferingIndexQuery>(ALL_OFFERINGS);

  const columns: ColumnType<AdminOfferingIndexQuery_offerings_nodes>[] = [
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
      sorter: (
        first: AdminOfferingIndexQuery_offerings_nodes,
        second: AdminOfferingIndexQuery_offerings_nodes
      ) => first.section.localeCompare(second.section),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Course',
      dataIndex: 'course',
      render: (_value: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/courses/${record.course.id}`}>{record.course.code}</Link>
      ),
      sorter: (
        first: AdminOfferingIndexQuery_offerings_nodes,
        second: AdminOfferingIndexQuery_offerings_nodes
      ) => first.course.code.localeCompare(second.course.code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Term',
      dataIndex: 'term',
      render: (_value: any, record: AdminOfferingIndexQuery_offerings_nodes) => (
        <Link to={`/admin/terms/${record.term.id}`}>
          {createTermName(record.term.startDate, record.term.endDate)}
        </Link>
      ),
      sorter: (
        first: AdminOfferingIndexQuery_offerings_nodes,
        second: AdminOfferingIndexQuery_offerings_nodes
      ) => new Date(first.term.startDate).getTime() - new Date(second.term.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
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
        loading={loading}
      />
    </>
  );
}
