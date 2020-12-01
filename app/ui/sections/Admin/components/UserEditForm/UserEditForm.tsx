import React from 'react';
import { Checkbox, Form, Input } from 'antd';

export interface UserEditFormData {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

interface Props {
  name: string;
  registration: boolean;
  onSubmit: (data: UserEditFormData) => void;
}

export default function UserEditForm(props: Props) {
  const { name, registration, onSubmit } = props;

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'You must enter a name' }]}
      >
        <Input placeholder="Name" />
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
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: 'You must enter a password' },
          { min: 6, message: 'Password must be at least 6 characters' },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      {!registration && (
        <Form.Item name="admin" valuePropName="checked" initialValue={false}>
          <Checkbox>Admin</Checkbox>
        </Form.Item>
      )}
    </Form>
  );
}
