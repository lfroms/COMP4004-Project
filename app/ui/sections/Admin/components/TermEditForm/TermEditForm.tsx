import React from 'react';
import { DatePicker, Form } from 'antd';
const { RangePicker } = DatePicker;

export interface TermEditFormData {
  startToEnd: Date[];
  registrationDeadline: Date;
  withdrawalDeadline: Date;
}

interface Props {
  name: string;
  onSubmit: (data: TermEditFormData) => void;
}

export default function TermEditForm(props: Props) {
  const { name, onSubmit } = props;

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="startToEnd"
        label="Start date - End date"
        rules={[{ type: 'array', required: true, message: 'You must select a start and end date' }]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item
        name="registrationDeadline"
        label="Registration Deadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a registration deadline' },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="withdrawalDeadline"
        label="Withdrawal Deadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a withdrawal deadline' },
        ]}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
}
