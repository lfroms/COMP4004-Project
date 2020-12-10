import React from 'react';
import { Form, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { UserGroupEditFormQuery } from './graphql/UserGroupEditFormQuery';

export interface UserGroupEditFormData {
  userId: string;
}

interface Props {
  name: string;
  onSubmit: (data: UserGroupEditFormData) => void;
}

const USERS = gql`
  query UserGroupEditFormQuery {
    users {
      nodes {
        id
        name
      }
    }
  }
`;

export default function UserGroupEditForm(props: Props) {
  const { data } = useQuery<UserGroupEditFormQuery>(USERS);
  const { name, onSubmit } = props;

  const userOptions = data?.users.nodes?.map((user, index) => (
    <Select.Option key={`user-select-${index}`} value={user?.id ?? 0}>
      {user?.name}
    </Select.Option>
  ));

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item name="userId" rules={[{ required: true, message: 'You must select a user' }]}>
        <Select placeholder="Select a user">{userOptions}</Select>
      </Form.Item>
    </Form>
  );
}
