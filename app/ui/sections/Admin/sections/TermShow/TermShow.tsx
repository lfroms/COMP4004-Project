import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { AppstoreAddOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Descriptions, Popconfirm, Tag } from 'antd';
import Table, { ColumnType } from 'antd/lib/table';
import { createFriendlyDate, createTermName } from 'helpers';
import { Link, useParams } from 'react-router-dom';
import { OfferingCreateModal } from 'sections/Admin/components';
import { TitleBar } from 'components';

import {
  AdminTermShowQuery,
  AdminTermShowQuery_term_offerings_nodes,
} from './graphql/AdminTermShowQuery';
import {
  AdminTermShowOfferingDeletionMutation,
  AdminTermShowOfferingDeletionMutationVariables,
} from './graphql/AdminTermShowOfferingDeletionMutation';

interface ParamType {
  termId: string;
}

const TERM = gql`
  query AdminTermShowQuery($id: ID!) {
    term(id: $id) {
      id
      startDate
      endDate
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

const DELETE_OFFERING = gql`
  mutation AdminTermShowOfferingDeletionMutation($id: ID!) {
    deleteOffering(input: { id: $id }) {
      offering {
        course {
          name
        }
        section
      }
    }
  }
`;

export default function TermShow() {
  const [offeringCreateModalVisible, setOfferingCreateModalVisible] = useState(false);
  const { termId } = useParams<ParamType>();

  const { data, loading } = useQuery<AdminTermShowQuery>(TERM, {
    variables: { id: termId },
  });

  const [deleteOffering, { loading: deleteLoading }] = useMutation<
    AdminTermShowOfferingDeletionMutation,
    AdminTermShowOfferingDeletionMutationVariables
  >(DELETE_OFFERING, {
    refetchQueries: ['AdminTermShowQuery'],
  });

  const handleConfirmDelete = (id: string) => () => deleteOffering({ variables: { id } });

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
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <TitleBar title={`${createTermName(term.startDate, term.endDate)} term`} />

      <Descriptions>
        <Descriptions.Item label="Start date">
          {createFriendlyDate(term.startDate)}
        </Descriptions.Item>
        <Descriptions.Item label="End date">{createFriendlyDate(term.endDate)}</Descriptions.Item>
        <Descriptions.Item label="Registration deadline">
          {createFriendlyDate(term.registrationDeadline)}
        </Descriptions.Item>
        <Descriptions.Item label="Withdrawal deadline">
          {createFriendlyDate(term.withdrawalDeadline)}
        </Descriptions.Item>
      </Descriptions>

      <TitleBar.Secondary
        title="Course offerings"
        actions={[
          {
            icon: <AppstoreAddOutlined />,
            onClick: () => setOfferingCreateModalVisible(true),
            text: 'New course offering',
          },
        ]}
      />

      <Table
        columns={columns}
        dataSource={term.offerings.nodes as AdminTermShowQuery_term_offerings_nodes[]}
        pagination={false}
        loading={loading}
      />

      <OfferingCreateModal
        visible={offeringCreateModalVisible}
        onRequestClose={() => setOfferingCreateModalVisible(false)}
        initialTermId={termId}
      />
    </>
  );
}
