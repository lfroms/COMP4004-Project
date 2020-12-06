import React from 'react';
import { Button, Modal, message } from 'antd';
import { OfferingEditForm, OfferingEditFormData } from '..';
import { gql, useMutation } from '@apollo/client';
import {
  CreateOfferingModalMutation,
  CreateOfferingModalMutationVariables,
} from './graphql/CreateOfferingModalMutation';

const FORM_NAME = 'offeringCreateForm';
interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  initialCourseId?: string;
  initialTermId?: string;
}

const CREATE_OFFERING = gql`
  mutation CreateOfferingModalMutation(
    $termId: ID!
    $capacity: Int!
    $courseId: ID!
    $section: String!
  ) {
    createOffering(
      input: { termId: $termId, capacity: $capacity, courseId: $courseId, section: $section }
    ) {
      offering {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function OfferingCreateModal(props: Props) {
  const { visible, onRequestClose, initialCourseId, initialTermId } = props;

  const [createOffering, { loading }] = useMutation<
    CreateOfferingModalMutation,
    CreateOfferingModalMutationVariables
  >(CREATE_OFFERING);

  const handleFormSubmit = async (formData: OfferingEditFormData) => {
    const { data } = await createOffering({
      variables: {
        section: formData.section,
        capacity: formData.capacity,
        courseId: formData.courseId,
        termId: formData.termId,
      },
      refetchQueries: ['TermShowQuery', 'AdminTermShowQuery', 'AdminOfferingIndexQuery'],
      awaitRefetchQueries: true,
    });

    data?.createOffering?.errors.forEach(error => message.error(error.message));

    if (data?.createOffering?.offering) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New course offering"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button
          id="offering_create_submit"
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
      <OfferingEditForm
        name={FORM_NAME}
        onSubmit={handleFormSubmit}
        initialCourseId={initialCourseId}
        initialTermId={initialTermId}
      />
    </Modal>
  );
}
