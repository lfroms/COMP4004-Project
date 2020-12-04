import React from 'react';
import {Form} from 'antd';

export interface DeliverableEditFormData {
  title: string;
  description: string;
  weight: number;
  dueData: Date;
}

interface Props {
  name: string;
  onSubmit: (data: DeliverableEditFormData) => void;
}

export default function DeliverableEditForm({ name, onSubmit }: Props) {

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="title"
        label="Title"
      >

      </Form.Item>
    </Form>
  );
}
