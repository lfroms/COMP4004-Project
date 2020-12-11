import React from 'react';
import { Button, Modal } from 'antd';
import { FinalGradeForm } from '../FinalGradeForm';
import { gql, useMutation } from '@apollo/client';
import {
  FinalGradeModalMutation,
  FinalGradeModalMutationVariables,
} from './graphql/FinalGradeModalMutation';

const FORM_NAME = 'finalGradeForm';

interface Props {
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

export default function FinalGradeModal({ visible, onRequestClose }: Props) {
  const [finalGrade, { loading }] = useMutation<
    FinalGradeModalMutation,
    FinalGradeModalMutationVariables
  >(FINAL_GRADE);

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
