import React from 'react';
import { Checkbox, Form, Input } from 'antd';

export interface UserEditFormData {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

interface Props {
  name: string;
  onSubmit: (data: UserEditFormData) => void;
}

export default function UserEditForm({ name, onSubmit }: Props) {
  return (
    <Form title={name} onFinish={onSubmit}>
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
            pattern: /A[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*z/,
            message: 'Email must have the form x@x.x',
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'You must enter a password' }, { len: 6 }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item name="admin" valuePropName="checked">
        <Checkbox>Admin</Checkbox>
      </Form.Item>
    </Form>
  );
}
