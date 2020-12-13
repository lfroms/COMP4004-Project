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
    <Form
      name={name}
      onFinish={onSubmit}
      requiredMark={false}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      colon={false}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'You must enter a title' }]}
      >
        <Input id="deliverable_title_field" placeholder="Deliverable 1" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'You must enter a description' }]}
      >
        <Input id="deliverable_description_field" placeholder="This deliverable is about..." />
      </Form.Item>
      <Form.Item
        id="deliverable_weight_form_item"
        label="Weight"
        name="weight"
        rules={[{ required: true, type: 'number', message: 'You must enter a weight' }]}
      >
        <InputNumber id="deliverable_weight_field" min={0} max={1} step={0.01} />
      </Form.Item>
      <Form.Item
        label="Due date"
        name="dueDate"
        rules={[{ required: true, message: 'You must enter a due date' }]}
      >
        <DatePicker id="deliverable_due_date_field" format="MM-DD-YY" />
      </Form.Item>
    </Form>
  );
}
