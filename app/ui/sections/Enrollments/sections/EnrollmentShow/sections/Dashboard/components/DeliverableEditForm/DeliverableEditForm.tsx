import React from 'react';
import { DatePicker, Form, Input, InputNumber } from 'antd';

export interface DeliverableEditFormData {
  title: string;
  description: string;
  weight: number;
  dueDate: Date;
}

interface Props {
  name: string;
  onSubmit: (data: DeliverableEditFormData) => void;
}

export default function DeliverableEditForm({ name, onSubmit }: Props) {
  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item name="title" rules={[{ required: true, message: 'You must enter a title' }]}>
        <Input id="deliverable_title_field" placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'You must enter a description' }]}
      >
        <Input id="deliverable_description_field" placeholder="Description" />
      </Form.Item>
      <Form.Item
        id="deliverable_weight_form_item"
        name="weight"
        rules={[{ required: true, type: 'number', message: 'You must enter a weight' }]}
      >
        <InputNumber
          id="deliverable_weight_field"
          placeholder="Weight"
          min={0}
          max={1}
          step={0.01}
        />
      </Form.Item>
      <Form.Item name="dueDate" rules={[{ required: true, message: 'You must enter a due date' }]}>
        <DatePicker id="deliverable_due_date_field" format="MM-DD-YY" />
      </Form.Item>
    </Form>
  );
}
