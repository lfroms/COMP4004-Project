import React from 'react';
import { Form, Input } from 'antd';

export interface SubmissionEditFormData {
  attachmentUrl: string;
}

interface Props {
  name: string;
  onSubmit: (data: SubmissionEditFormData) => void;
}

export default function SubmissionEditFormEditForm({ name, onSubmit }: Props) {
  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'You must enter a URL', type: 'url' }]}
      >
        <Input id="submission_url_field" placeholder="Address of attachment" />
      </Form.Item>
    </Form>
  );
}
