import React from 'react';
import { Button, Modal } from 'antd';
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
    $financialDeadline: ISO8601DateTime!
  ) {
    createTerm(
      input: {
        startDate: $startDate
        endDate: $endDate
        registrationDeadline: $registrationDeadline
        withdrawalDeadline: $withdrawalDeadline
        financialDeadline: $financialDeadline
      }
    ) {
      term {
        id
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

  const handleFormSubmit = async (data: TermEditFormData) => {
    await createTerm({
      variables: {
        startDate: data.startToEnd[0],
        endDate: data.startToEnd[1],
        registrationDeadline: data.registrationDeadline,
        withdrawalDeadline: data.withdrawalDeadline,
        financialDeadline: data.financialDeadline,
      },
      refetchQueries: ['AdminTermIndexQuery', 'AdminTermShowQuery'],
      awaitRefetchQueries: true,
    });

    onRequestClose?.();
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
