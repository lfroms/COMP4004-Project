import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Divider, Empty, Table } from 'antd';
import { useQueryParams } from 'hooks';
import { createTermName } from 'helpers';

import {
  OfferingIndexQuery,
  OfferingIndexQuery_term_offerings_nodes,
} from './graphql/OfferingIndexQuery';

import * as styles from './OfferingIndex.module.scss';

export default function OfferingIndex() {
  const OFFERINGS_FOR_TERM = gql`
    query OfferingIndexQuery($termId: ID!) {
      term(id: $termId) {
        startDate
        endDate
        offerings {
          nodes {
            id
            section
            course {
              id
              name
              code
            }
          }
        }
      }
    }
  `;

  const params = useQueryParams();
  const { data } = useQuery<OfferingIndexQuery>(OFFERINGS_FOR_TERM, {
    variables: {
      termId: params.get('termId'),
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: ['course', 'name'],
      key: 'name',
    },
    {
      title: 'Course code',
      dataIndex: ['course', 'code'],
      key: 'code',
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
  ];

  if (!data?.term) {
    return (
      <div className={styles.EmptyContainer}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Select a term to view available courses."
        />
      </div>
    );
  }

  const offerings = data.term.offerings.nodes?.filter(Boolean) ?? [];
  const { startDate, endDate } = data.term;

  return (
    <>
      <Divider orientation="left">{createTermName(startDate, endDate)} term</Divider>
      <Table
        columns={columns}
        dataSource={offerings as OfferingIndexQuery_term_offerings_nodes[]}
        pagination={false}
      />
    </>
  );
}
