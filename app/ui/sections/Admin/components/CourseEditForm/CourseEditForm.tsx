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

  const { Option } = Select;

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
        label="Code"
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
        <Input id="course_code_field" placeholder="ABCD 1234" />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'You must enter a name',
          },
        ]}
      >
        <Input id="course_name_field" placeholder="Intro to Knowledge" />
      </Form.Item>

      <Form.Item
        label="Prerequisites"
        name="prerequisiteIds"
        hasFeedback
        rules={[
          {
            type: 'array',
          },
        ]}
      >
        <Select id="course_prerequisites_field" mode="multiple" showSearch={false}>
          {data?.courses.nodes?.map((prerequisite, index) => (
            <Option
              key={`prerequisite-select-${index}`}
              className="prerequisite_option"
              value={prerequisite?.id ?? 0}
            >
              {prerequisite?.code}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
