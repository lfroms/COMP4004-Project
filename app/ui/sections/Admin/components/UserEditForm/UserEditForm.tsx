import React from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { UserEditFormQuery } from './graphql/UserEditFormQuery';

export interface UserEditFormData {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  groupIds?: string[];
}

interface Props {
  name: string;
  onSubmit: (data: UserEditFormData) => void;
}

const GROUPS = gql`
  query UserEditFormQuery {
    groups {
      nodes {
        id
        name
      }
    }
  }
`;

export default function UserEditForm(props: Props) {
  const { data } = useQuery<UserEditFormQuery>(GROUPS);
  const { name, onSubmit } = props;

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'You must enter a name' }]}
      >
        <Input id="user_name_field" placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="email"
        hasFeedback
        rules={[
          { required: true, message: 'You must enter an email' },
          {
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Email must have the form x@x.x',
          },
        ]}
      >
        <Input id="user_email_field" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: 'You must enter a password' },
          { min: 6, message: 'Password must be at least 6 characters' },
        ]}
      >
        <Input.Password id="user_password_field" placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="groupIds"
        hasFeedback
        rules={[
          {
            type: 'array',
          },
        ]}
      >
        <Select id="user_groups_select" mode="multiple" placeholder="Groups" showSearch={false}>
          {data?.groups.nodes?.map((group, index) => (
            <Select.Option key={`group-select-${index}`} value={group?.id ?? 0}>
              {group?.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="admin" valuePropName="checked" initialValue={false}>
        <Checkbox id="user_admin_field">Admin</Checkbox>
      </Form.Item>
    </Form>
  );
}
