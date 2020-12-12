import React from 'react';
import { DatePicker, Form, InputNumber } from 'antd';
const { RangePicker } = DatePicker;

export interface TermEditFormData {
  startToEnd: Date[];
  registrationDeadline: Date;
  withdrawalDeadline: Date;
  perCreditFee: number;
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
        <RangePicker format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        name="registrationDeadline"
        label="Registration Deadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a registration deadline' },
        ]}
      >
        <DatePicker id="term_registration_deadline_field" format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        name="withdrawalDeadline"
        label="Withdrawal Deadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a withdrawal deadline' },
        ]}
      >
        <DatePicker id="term_withdrawal_deadline_field" format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        name="perCreditFee"
        label="Per credit fee"
        rules={[{ required: true, type: 'number', message: 'You must enter a fee' }]}
      >
        <InputNumber id="term_fee_field" placeholder="Per credit fee" min={0} />
      </Form.Item>
    </Form>
  );
}
