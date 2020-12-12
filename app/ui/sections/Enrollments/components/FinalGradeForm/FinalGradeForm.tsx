import React from 'react';
import { Form, Select } from 'antd';

export interface FinalGradeFormData {
  finalGrade: string;
}

interface Props {
  name: string;
  onSubmit(data: FinalGradeFormData): void;
}

const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'WDN'];

export default function FinalGradeForm({ name, onSubmit }: Props) {
  const { Option } = Select;

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="finalGrade"
        hasFeedback
        rules={[{ required: true, message: 'You must select a grade' }]}
      >
        <Select id="final_grade_select" placeholder="Final Grade">
          {GRADES.map((grade, index) => (
            <Option
              key={`grade-select-${index}`}
              className={`final_grade_select_${grade}`}
              value={grade}
            >
              {grade}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
