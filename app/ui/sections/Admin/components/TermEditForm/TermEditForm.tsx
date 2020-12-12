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
    <Form
      name={name}
      onFinish={onSubmit}
      requiredMark={false}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      colon={false}
    >
      <Form.Item
        label="Start and end dates"
        name="startToEnd"
        rules={[{ type: 'array', required: true, message: 'You must select a start and end date' }]}
      >
        <RangePicker format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        label="Registration deadline"
        name="registrationDeadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a registration deadline' },
        ]}
      >
        <DatePicker id="term_registration_deadline_field" format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        label="Withdrawal deadline"
        name="withdrawalDeadline"
        rules={[
          { type: 'object', required: true, message: 'You must select a withdrawal deadline' },
        ]}
      >
        <DatePicker id="term_withdrawal_deadline_field" format="MM-DD-YY" />
      </Form.Item>

      <Form.Item
        label="Per credit fee"
        name="perCreditFee"
        rules={[{ required: true, type: 'number', message: 'You must enter a fee' }]}
      >
        <InputNumber id="term_fee_field" min={0} placeholder="0" />
      </Form.Item>
    </Form>
  );
}
