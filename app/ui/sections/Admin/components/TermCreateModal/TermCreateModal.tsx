import React from 'react';
import { Button, Modal, message } from 'antd';
import { TermEditForm, TermEditFormData } from '..';
import { gql, useMutation } from '@apollo/client';
import {
  CreateTermModalMutation,
  CreateTermModalMutationVariables,
} from './graphql/CreateTermModalMutation';

const FORM_NAME = 'termCreateForm';
interface Props {
  visible: boolean;
  onRequestClose?: () => void;
}

const CREATE_TERM = gql`
  mutation CreateTermModalMutation(
    $startDate: ISO8601DateTime!
    $endDate: ISO8601DateTime!
    $registrationDeadline: ISO8601DateTime!
    $withdrawalDeadline: ISO8601DateTime!
    $perCreditFee: Float!
  ) {
    createTerm(
      input: {
        startDate: $startDate
        endDate: $endDate
        registrationDeadline: $registrationDeadline
        withdrawalDeadline: $withdrawalDeadline
        perCreditFee: $perCreditFee
      }
    ) {
      term {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function TermCreateModal(props: Props) {
  const { visible, onRequestClose } = props;

  const [createTerm, { loading }] = useMutation<
    CreateTermModalMutation,
    CreateTermModalMutationVariables
  >(CREATE_TERM);

  const handleFormSubmit = async (formData: TermEditFormData) => {
    const { data } = await createTerm({
      variables: {
        startDate: formData.startToEnd[0],
        endDate: formData.startToEnd[1],
        registrationDeadline: formData.registrationDeadline,
        withdrawalDeadline: formData.withdrawalDeadline,
        perCreditFee: formData.perCreditFee,
      },
      refetchQueries: ['AdminTermIndexQuery', 'AdminTermShowQuery'],
      awaitRefetchQueries: true,
    });

    data?.createTerm?.errors.forEach(error => message.error(error.message));

    if (data?.createTerm?.term) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New term"
      visible={visible}
      onCancel={onRequestClose}
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
      <TermEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
