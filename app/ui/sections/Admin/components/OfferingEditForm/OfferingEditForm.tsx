import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { OfferingEditFormQuery } from './graphql/OfferingEditFormQuery';
import { createTermName } from 'helpers';

interface FormData {
  section: string;
  courseId: string;
  termId: string;
}

interface Props {
  onFinish: (data: FormData) => void;
}

const COURSES_TERMS = gql`
  query OfferingEditFormQuery {
    courses {
      nodes {
        id
        code
      }
    }
    terms {
      nodes {
        id
        startDate
        endDate
      }
    }
  }
`;

export default function OfferingEditForm(props: Props) {
  const { onFinish } = props;

  const { data } = useQuery<OfferingEditFormQuery>(COURSES_TERMS);

  const courseOptions = data?.courses.nodes?.map((course, index) => (
    <Select.Option key={`course-select-${index}`} value={course?.id ?? 0}>
      {course?.code}
    </Select.Option>
  ));

  const termOptions = data?.terms.nodes?.map((term, index) => (
    <Select.Option key={`term-select-${index}`} value={term?.id ?? 0}>
      {term ? createTermName(term.startDate, term.endDate) : null}
    </Select.Option>
  ));

  return (
    <Form name="offeringEdit" onFinish={onFinish}>
      <Form.Item
        name="section"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'You must enter a section',
          },
          {
            pattern: /[A-Z]{1}/,
            message: 'Section must be a single letter from A - Z',
          },
        ]}
      >
        <Input placeholder="Section" />
      </Form.Item>

      <Form.Item
        name="courseId"
        hasFeedback
        rules={[{ required: true, message: 'You must select a course' }]}
      >
        <Select placeholder="Select a course">{courseOptions}</Select>
      </Form.Item>

      <Form.Item
        name="termId"
        hasFeedback
        rules={[{ required: true, message: 'You must select a term' }]}
      >
        <Select placeholder="Select a term">{termOptions}</Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create offering
        </Button>
      </Form.Item>
    </Form>
  );
}
