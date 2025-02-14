import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Table, Tag, message } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { Link } from 'react-router-dom';
import { createTermName } from 'helpers';
import { TitleBar } from 'components';
import { OfferingCreateModal } from 'sections/Admin/components';

import {
  AdminOfferingIndexQuery,
  AdminOfferingIndexQuery_offerings_nodes,
} from './graphql/AdminOfferingIndexQuery';
import {
  AdminOfferingIndexOfferingDeletionMutation,
  AdminOfferingIndexOfferingDeletionMutationVariables,
} from './graphql/AdminOfferingIndexOfferingDeletionMutation';

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

const DELETE_OFFERING = gql`
  mutation AdminOfferingIndexOfferingDeletionMutation($id: ID!) {
    deleteOffering(input: { id: $id }) {
      offering {
        id
        section
        course {
          id
          name
        }
      }
      errors {
        message
      }
    }
  }
`;

export default function OfferingIndex() {
  const [offeringCreateModalVisible, setOfferingCreateModalVisible] = useState(false);

  const { data, loading } = useQuery<AdminOfferingIndexQuery>(ALL_OFFERINGS);
  const [deleteOffering, { loading: deleteLoading }] = useMutation<
    AdminOfferingIndexOfferingDeletionMutation,
    AdminOfferingIndexOfferingDeletionMutationVariables
  >(DELETE_OFFERING, {
    refetchQueries: [{ query: ALL_OFFERINGS }],
  });

  const handleConfirmDelete = (id: string) => async () => {
    const { data } = await deleteOffering({ variables: { id } });
    data?.deleteOffering?.errors.forEach(error => message.error(error.message));
  };

  const columns: ColumnType<AdminOfferingIndexQuery_offerings_nodes>[] = [
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
      title: 'Course',
      dataIndex: ['course', 'code'],
      render: (text, record) => <Link to={`/admin/courses/${record.course.id}`}>{text}</Link>,
      sorter: (first, second) => first.course.code.localeCompare(second.course.code),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Term',
      dataIndex: 'term',
      render: (_text, record) => (
        <Link to={`/admin/terms/${record.term.id}`}>
          {createTermName(record.term.startDate, record.term.endDate)}
        </Link>
      ),
      sorter: (first, second) =>
        new Date(first.term.startDate).getTime() - new Date(second.term.startDate).getTime(),
      sortDirections: ['ascend', 'descend'],
    },
    {
      key: 'actions',
      fixed: 'right',
      align: 'right',
      render: (_text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this offering?"
          placement="rightBottom"
          onConfirm={handleConfirmDelete(record.id)}
          okText="Confirm"
          cancelText="Cancel"
          okButtonProps={{ loading: deleteLoading }}
        >
          <Button danger id="delete_offering" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const offerings = data?.offerings.nodes?.filter(Boolean) ?? [];

  return (
    <>
      <TitleBar
        title="Course offerings"
        actions={[
          {
            elementId: 'new_offering',
            icon: <AppstoreAddOutlined />,
            onClick: () => setOfferingCreateModalVisible(true),
            text: 'New course offering',
          },
        ]}
      />

      <Table
        id="offering_index"
        columns={columns}
        dataSource={offerings as AdminOfferingIndexQuery_offerings_nodes[]}
        pagination={false}
        loading={loading}
      />

      <OfferingCreateModal
        visible={offeringCreateModalVisible}
        onRequestClose={() => setOfferingCreateModalVisible(false)}
      />
    </>
  );
}
