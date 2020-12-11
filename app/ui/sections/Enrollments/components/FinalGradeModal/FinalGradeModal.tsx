import React from 'react';
import { Button, Modal, message } from 'antd';
import { FinalGradeForm, FinalGradeFormData } from '../FinalGradeForm';
import { gql, useMutation } from '@apollo/client';
import {
  FinalGradeModalMutation,
  FinalGradeModalMutationVariables,
} from './graphql/FinalGradeModalMutation';

const FORM_NAME = 'finalGradeForm';

interface Props {
  enrollmentId: string;
  visible: boolean;
  onRequestClose(): void;
}

const FINAL_GRADE = gql`
  mutation FinalGradeModalMutation($enrollmentId: ID!, $finalGrade: String!) {
    updateEnrollment(input: { id: $enrollmentId, finalGrade: $finalGrade }) {
      enrollment {
        id
        finalGrade
      }
      errors {
        message
      }
    }
  }
`;

export default function FinalGradeModal({ enrollmentId, visible, onRequestClose }: Props) {
  const [updateFinalGrade, { loading }] = useMutation<
    FinalGradeModalMutation,
    FinalGradeModalMutationVariables
  >(FINAL_GRADE);

  const handleFormSubmit = async (formData: FinalGradeFormData) => {
    const { data } = await updateFinalGrade({
      variables: {
        enrollmentId: enrollmentId,
        finalGrade: formData.finalGrade,
      },
      refetchQueries: ['DeliverableShowQuery'],
    });

    data?.updateEnrollment?.errors.forEach(error => message.error(error.message));

    if (data?.updateEnrollment?.enrollment) {
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
      <FinalGradeForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
