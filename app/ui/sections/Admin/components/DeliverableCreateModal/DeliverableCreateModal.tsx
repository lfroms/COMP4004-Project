import { gql, useMutation } from '@apollo/client';
import React from 'react';
import {
  CreateDeliverableModalMutation,
  CreateDeliverableModalMutationVariables,
} from './graphql/CreateDeliverableModalMutation';

import { DeliverableEditForm, DeliverableEditFormData } from '../DeliverableEditForm';
import { Button, Modal, message } from 'antd';

const FORM_NAME = 'deliverableCreateForm';

const CREATE_DELIVERABLE = gql`
  mutation CreateDeliverableModalMutation(
    $title: String!
    $description: String!
    $weight: Float!
    $dueDate: ISO8601DateTime!
    $offeringId: ID!
  ) {
    createDeliverable(
      input: {
        title: $title
        description: $description
        weight: $weight
        dueDate: $dueDate
        offeringId: $offeringId
      }
    ) {
      deliverable {
        id
      }
      errors {
        message
      }
    }
  }
`;

interface Props {
  offeringId: string;
  visible: boolean;
  onRequestClose: () => void;
}

export default function DeliverableCreateModal({ offeringId, visible, onRequestClose }: Props) {
  const [createDeliverable, { loading }] = useMutation<
    CreateDeliverableModalMutation,
    CreateDeliverableModalMutationVariables
  >(CREATE_DELIVERABLE);

  const handleFormSubmit = async (formData: DeliverableEditFormData) => {
    const { data } = await createDeliverable({
      variables: {
        title: formData.title,
        description: formData.description,
        weight: formData.weight,
        dueDate: formData.dueDate,
        offeringId: offeringId,
      },
    });

    data?.createDeliverable?.errors.forEach(error => message.error(error.message));

    if (data?.createDeliverable?.deliverable) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New deliverable"
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
      <DeliverableEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
