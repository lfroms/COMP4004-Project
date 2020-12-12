import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, message } from 'antd';
import { createFriendlyDate, createTermName } from 'helpers';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { TermCreateModal } from 'sections/Admin/components';
import { TitleBar } from 'components';

import {
  AdminTermIndexQuery,
  AdminTermIndexQuery_terms_nodes,
} from './graphql/AdminTermIndexQuery';
import {
  AdminTermIndexTermDeleteMutation,
  AdminTermIndexTermDeleteMutationVariables,
} from './graphql/AdminTermIndexTermDeleteMutation';

const ALL_TERMS = gql`
  query AdminTermIndexQuery {
    terms {
      nodes {
        id
        startDate
        endDate
        registrationDeadline
        withdrawalDeadline
      }
    }
  }
`;

const DELETE_TERM = gql`
  mutation AdminTermIndexTermDeleteMutation($id: ID!) {
    deleteTerm(input: { id: $id }) {
      term {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function TermIndex() {
  const [termCreateModalVisible, setTermCreateModalVisible] = useState(false);
  const { data, loading } = useQuery<AdminTermIndexQuery>(ALL_TERMS);

  const [deleteTerm, { loading: deleteTermLoading }] = useMutation<
    AdminTermIndexTermDeleteMutation,
    AdminTermIndexTermDeleteMutationVariables
  >(DELETE_TERM, {
    refetchQueries: [{ query: ALL_TERMS }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteTerm({ variables: { id } });
    data?.deleteTerm?.errors.forEach(error => message.error(error.message));
  };

  const columns: ColumnType<AdminTermIndexQuery_terms_nodes>[] = [
    {
      dataIndex: 'name',
      render: (_value, record) => (
        <Link to={`/admin/terms/${record.id}`}>
          {createTermName(record.startDate, record.endDate)}
        </Link>
      ),
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      render: value => createFriendlyDate(value),
      sorter: (first, second) =>
        new Date(first.startDate).getTime() - new Date(second.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      render: value => createFriendlyDate(value),
    },
    {
      key: 'action',
      fixed: 'right',
      align: 'right',
      render: (_value, record) => (
        <Popconfirm
          placement="rightBottom"
          title="Are you sure you want to delete this term?"
          onConfirm={handleConfirmDelete(record.id)}
          okText="Confirm"
          okButtonProps={{ loading: deleteTermLoading }}
          cancelText="Cancel"
        >
          <Button id={`delete_term_id_${record.id}`} danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const terms = data?.terms.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Terms"
        actions={[
          {
            elementId: 'new_term',
            icon: <AppstoreAddOutlined />,
            onClick: () => setTermCreateModalVisible(true),
            text: 'New term',
          },
        ]}
      />

      <Table
        columns={columns}
        dataSource={terms as AdminTermIndexQuery_terms_nodes[]}
        pagination={false}
        loading={loading}
      />

      <TermCreateModal
        visible={termCreateModalVisible}
        onRequestClose={() => setTermCreateModalVisible(false)}
      />
    </>
  );
}
