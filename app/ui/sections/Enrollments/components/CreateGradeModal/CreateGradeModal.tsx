import { gql, useMutation } from '@apollo/client';
import { Button, Modal, message } from 'antd';
import React from 'react';
import { GradeEditForm, GradeEditFormData } from '../GradeEditForm';
import {
  CreateGradeModalMutation,
  CreateGradeModalMutationVariables,
} from './graphql/CreateGradeModalMutation';

const FORM_NAME = 'gradeCreateForm';

const CREATE_GRADE = gql`
  mutation CreateGradeModalMutation($submissionId: ID!, $value: Float!, $comment: String!) {
    createGrade(input: { submissionId: $submissionid, value: $value, comment: $comment }) {
      grade {
        id
      }
      errors {
        message
      }
    }
  }
`;

interface Props {
  submissionId: string;
  visible: boolean;
  onRequestClose: () => void;
}

export default function CreateGradeModal({ submissionId, visible, onRequestClose }: Props) {
  const [createGrade, { loading }] = useMutation<
    CreateGradeModalMutation,
    CreateGradeModalMutationVariables
  >(CREATE_GRADE);

  const handleFormSubmit = async (formData: GradeEditFormData) => {
    const { data } = await createGrade({
      variables: {
        submissionId: submissionId,
        value: formData.value,
        comment: formData.comment,
      },
    });

    data?.createGrade?.errors.forEach(error => message.error(error.message));

    if (data?.createGrade?.grade) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New submission grade"
      visible={visible}
      onCancel={() => onRequestClose()}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button form={FORM_NAME} key="submit" htmlType="submit" type="primary" loading={loading}>
          Create
        </Button>,
      ]}
    >
      <GradeEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
