import React from 'react';
import { Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { CourseEditFormQuery } from './graphql/CourseEditFormQuery';

export interface CourseEditFormData {
  code: string;
  name: string;
  prerequisiteIds: string[];
}

interface Props {
  name: string;
  onSubmit: (data: CourseEditFormData) => void;
}

const PREREQUISITES = gql`
  query CourseEditFormQuery {
    courses {
      nodes {
        id
        code
      }
    }
  }
`;

export default function CourseEditForm(props: Props) {
  const { name, onSubmit } = props;
  const { data } = useQuery<CourseEditFormQuery>(PREREQUISITES);

  // const prerequisiteOptions = data?.courses.nodes?.map((prerequisite, index) => (
  //   <Option key={`prerequisite-select-${index}`} value={prerequisite?.id ?? 0}>
  //     {prerequisite?.code}
  //   </Option>
  // ));

  const { Option } = Select;

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="code"
        hasFeedback
        rules={[
          { required: true, message: 'You must enter a course code' },
          {
            pattern: /[A-Z]{4} [0-9]{4}/,
            message: 'Code must have the form  XXXX 0000',
          },
        ]}
      >
        <Input placeholder="Code" />
      </Form.Item>

      <Form.Item
        name="name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'You must enter a name',
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name="prerequisiteIds"
        hasFeedback
        rules={[
          {
            type: 'array',
          },
        ]}
      >
        <Select mode="multiple" placeholder="Prerequisites">
          {data?.courses.nodes?.map((prerequisite, index) => (
            <Option key={`prerequisite-select-${index}`} value={prerequisite?.id ?? 0}>
              {prerequisite?.code}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
