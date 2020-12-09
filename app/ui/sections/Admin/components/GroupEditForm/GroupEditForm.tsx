import React from 'react';
import { Form, Input, Switch } from 'antd';

export interface GroupEditFormData {
  name: string;
  canSelfEnroll: boolean;
}

interface Props {
  name: string;
  onSubmit: (data: GroupEditFormData) => void;
}

export default function GroupEditForm(props: Props) {
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
        name="name"
        label="Name"
        hasFeedback
        rules={[{ required: true, message: 'You must enter a name' }]}
      >
        <Input id="group_name_field" autoFocus />
      </Form.Item>

      <Form.Item
        name="canSelfEnroll"
        label="Users can self-enroll"
        valuePropName="checked"
        initialValue={false}
        hasFeedback
      >
        {/* id does indeed exist */}
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <Switch id="group_can_self_enroll_switch" />
      </Form.Item>
    </Form>
  );
}
