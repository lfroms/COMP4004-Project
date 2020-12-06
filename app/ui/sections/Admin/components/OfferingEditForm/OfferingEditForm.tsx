import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { OfferingEditFormQuery } from './graphql/OfferingEditFormQuery';
import { createTermName } from 'helpers';

export interface OfferingEditFormData {
  section: string;
  capacity: number;
  courseId: string;
  termId: string;
}

interface Props {
  name: string;
  initialCourseId?: string;
  initialTermId?: string;
  onSubmit: (data: OfferingEditFormData) => void;
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
  const { name, initialCourseId, initialTermId, onSubmit } = props;
  const { data } = useQuery<OfferingEditFormQuery>(COURSES_TERMS);

  const courseOptions = data?.courses.nodes?.map((course, index) => (
    <Select.Option
      className="offering_form_course_option"
      key={`course-select-${index}`}
      value={course?.id ?? 0}
    >
      {course?.code}
    </Select.Option>
  ));

  const termOptions = data?.terms.nodes?.map((term, index) => (
    <Select.Option
      className="offering_form_term_option"
      key={`term-select-${index}`}
      value={term?.id ?? 0}
    >
      {term ? createTermName(term.startDate, term.endDate) : null}
    </Select.Option>
  ));

  return (
    <Form name={name} onFinish={onSubmit}>
      <Form.Item
        name="termId"
        hasFeedback
        initialValue={initialTermId}
        rules={[{ required: true, message: 'You must select a term' }]}
      >
        <Select id="offering_term_select" placeholder="Select a term">
          {termOptions}
        </Select>
      </Form.Item>

      <Form.Item
        name="courseId"
        hasFeedback
        initialValue={initialCourseId}
        rules={[{ required: true, message: 'You must select a course' }]}
      >
        <Select id="offering_course_select" placeholder="Select a course">
          {courseOptions}
        </Select>
      </Form.Item>

      <Form.Item
        name="section"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'You must enter a section',
          },
          {
            pattern: /^[A-Z]{1}$/,
            message: 'Section must be a single letter from A - Z',
          },
        ]}
      >
        <Input id="offering_section_field" placeholder="Section" />
      </Form.Item>

      <Form.Item
        name="capacity"
        rules={[
          {
            required: true,
            message: 'You must enter a capacity',
          },
          {
            type: 'number',
            min: 1,
            max: 400,
            message: 'Capacity must be between 1 and 400',
          },
        ]}
      >
        <InputNumber id="offering_capacity_field" placeholder="Capacity" />
      </Form.Item>
    </Form>
  );
}
