import React from 'react';
import { Form, Input, InputNumber } from 'antd';

export interface GradeEditFormData {
  value: number;
  comment: string;
}

interface Props {
  name: string;
  onSubmit: (data: GradeEditFormData) => void;
}

export default function GradeEditForm({ name, onSubmit }: Props) {
  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="value"
        rules={[{ required: true, message: 'You must enter a value' }, { max: 1 }, { min: 0 }]}
      >
        <InputNumber id="grade_value_field" placeholder="Value" />
      </Form.Item>
      <Form.Item name="comment" rules={[{ required: true, message: 'You must enter a comment' }]}>
        <Input id="grade_comment_field" placeholder="Comment" />
      </Form.Item>
    </Form>
  );
}
