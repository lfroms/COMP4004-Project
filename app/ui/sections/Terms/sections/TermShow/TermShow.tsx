import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { NavigationGroup, Page } from 'components';
import { Divider, Empty, Table } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { createTermName } from 'helpers';

import { TermShowQuery, TermShowQuery_terms_nodes_offerings_nodes } from './graphql/TermShowQuery';

import * as styles from './TermShow.module.scss';

interface ParamType {
  termId: string;
}

export default function TermShow() {
  const { termId } = useParams<ParamType>();

  const TERMS_WITH_OFFERINGS = gql`
    query TermShowQuery {
      terms {
        nodes {
          id
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
    }
  `;

  const history = useHistory();
  const { data } = useQuery<TermShowQuery>(TERMS_WITH_OFFERINGS);

  const groups: NavigationGroup[] =
    (data?.terms.nodes
      ?.map(term => {
        if (!term) {
          return null;
        }

        return {
          id: `${term.id}`,
          title: createTermName(term.startDate, term.endDate),
          icon: <CalendarOutlined />,
          onSelect: () => history.push(`/terms/${term.id}`),
        };
      })
      .filter(Boolean) as NavigationGroup[]) ?? [];

  const emptyState = (
    <div className={styles.EmptyContainer}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Select a term to view available courses."
      />
    </div>
  );

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

  const currentTerm = data?.terms.nodes?.find(term => term?.id === termId);
  const offerings = currentTerm?.offerings.nodes?.filter(Boolean) ?? [];

  return (
    <Page title="Course Directory" groups={groups} selectedItemId={termId}>
      {currentTerm ? (
        <>
          <Divider orientation="left">
            {createTermName(currentTerm.startDate, currentTerm.endDate)} term
          </Divider>
          <Table
            columns={columns}
            dataSource={offerings as TermShowQuery_terms_nodes_offerings_nodes[]}
            pagination={false}
          />
        </>
      ) : (
        emptyState
      )}
    </Page>
  );
}
