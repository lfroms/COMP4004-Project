import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Modal, message } from 'antd';
import { SubmissionEditForm, SubmissionEditFormData } from '../SubmissionEditForm';
import {
  SubmissionCreateModalMutation,
  SubmissionCreateModalMutationVariables,
} from './graphql/SubmissionCreateModalMutation';

const FORM_NAME = 'submissionCreateForm';

const CREATE_SUBMISSION = gql`
  mutation SubmissionCreateModalMutation($deliverableId: ID!, $attachmentURL: String!) {
    createSubmission(input: { deliverableId: $deliverableId, attachmentUrl: $attachmentUrl }) {
      submission {
        id
      }
      errors {
        message
      }
    }
  }
`;

interface Props {
  deliverableId: string;
  visible: boolean;
  onRequestClose: () => void;
}

export default function SubmissionCreateModal({ deliverableId, visible, onRequestClose }: Props) {
  const [createSubmission, { loading }] = useMutation<
    SubmissionCreateModalMutation,
    SubmissionCreateModalMutationVariables
  >(CREATE_SUBMISSION);

  const handleFormSubmit = async (formData: SubmissionEditFormData) => {
    const { data } = await createSubmission({
      variables: {
        deliverableId,
        attachmentURL: formData.attachmentUrl,
      },
    });

    data?.createSubmission?.errors.forEach(error => message.error(error.message));

    if (data?.createSubmission?.submission) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New submission"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button form={FORM_NAME} key="submit" htmlType="submit" type="primary" loading={loading}>
          Submit
        </Button>,
      ]}
    >
      <SubmissionEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
