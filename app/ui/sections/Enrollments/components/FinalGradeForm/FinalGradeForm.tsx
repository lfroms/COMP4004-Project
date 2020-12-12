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
      <Form.Item name="finalGrade" hasFeedback>
        <Select id="final_grade_select" placeholder="Final Grade">
          {GRADES.map((grade, index) => (
            <Option key={`prerequisite-select-${index}`} value={grade}>
              {grade}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
