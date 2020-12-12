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
    <Form
      name={name}
      onFinish={onSubmit}
      requiredMark={false}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      colon={false}
    >
      <Form.Item
        label="Grade"
        name="value"
        rules={[{ required: true, message: 'You must enter a value' }, { type: 'number' }]}
      >
        <InputNumber id="grade_value_field" min={0} max={1} step={0.01} />
      </Form.Item>
      <Form.Item
        label="Comment"
        name="comment"
        rules={[{ required: true, message: 'You must enter a comment' }]}
      >
        <Input id="grade_comment_field" />
      </Form.Item>
    </Form>
  );
}
