import React from 'react';
import { Button, Modal, message } from 'antd';
import { CourseEditForm, CourseEditFormData } from '..';
import { gql, useMutation } from '@apollo/client';
import {
  CreateCourseModalMutation,
  CreateCourseModalMutationVariables,
} from './graphql/CreateCourseModalMutation';

const FORM_NAME = 'courseCreateForm';
interface Props {
  visible: boolean;
  onRequestClose?: () => void;
}

const CREATE_COURSE = gql`
  mutation CreateCourseModalMutation($code: String!, $name: String!, $prerequisiteIds: [ID!]) {
    createCourse(input: { code: $code, name: $name, prerequisiteIds: $prerequisiteIds }) {
      course {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function CourseCreateModal(props: Props) {
  const { visible, onRequestClose } = props;

  const [createCourse, { loading }] = useMutation<
    CreateCourseModalMutation,
    CreateCourseModalMutationVariables
  >(CREATE_COURSE);

  const handleFormSubmit = async (formData: CourseEditFormData) => {
    const { data } = await createCourse({
      variables: {
        code: formData.code,
        name: formData.name,
        prerequisiteIds: formData.prerequisiteIds,
      },
      refetchQueries: ['AdminCourseIndexQuery', 'AdminCourseShowQuery'],
      awaitRefetchQueries: true,
    });

    data?.createCourse?.errors.forEach(error => message.error(error.message));

    if (data?.createCourse?.course) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New course"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button
          id="course_create_submit"
          form={FORM_NAME}
          key="submit"
          htmlType="submit"
          type="primary"
          loading={loading}
        >
          Create
        </Button>,
      ]}
    >
      <CourseEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
