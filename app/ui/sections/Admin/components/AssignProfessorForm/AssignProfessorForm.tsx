import React from 'react';
import { Form, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { AssignProfessorFormQuery } from './graphql/AssignProfessorFormQuery';

export interface AssignProfessorFormData {
  userId: string;
}

interface Props {
  name: string;
  onSubmit: (data: AssignProfessorFormData) => void;
}

const USERS = gql`
  query AssignProfessorFormQuery {
    users {
      nodes {
        id
        name
      }
    }
  }
`;

export default function AssignProfessorForm(props: Props) {
  const { name, onSubmit } = props;
  const { data } = useQuery<AssignProfessorFormQuery>(USERS);

  const professorOptions = data?.users.nodes?.map((user, index) => (
    <Select.Option
      key={`user-select-${index}`}
      value={user?.id ?? 0}
      className="assign_professor_option"
    >
      {user?.name}
    </Select.Option>
  ));

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item name="userId" rules={[{ required: true, message: 'You must select a professor' }]}>
        <Select id="assign_professor_select" placeholder="Select a professor">
          {professorOptions}
        </Select>
      </Form.Item>
    </Form>
  );
}
