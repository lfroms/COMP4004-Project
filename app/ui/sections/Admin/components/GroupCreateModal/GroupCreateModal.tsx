import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Modal, message } from 'antd';
import { GroupEditForm, GroupEditFormData } from '..';

import {
  GroupCreateModalMutation,
  GroupCreateModalMutationVariables,
} from './graphql/GroupCreateModalMutation';

const FORM_NAME = 'groupCreateForm';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
}

const CREATE_GROUP = gql`
  mutation GroupCreateModalMutation($name: String!, $canSelfEnroll: Boolean!) {
    createGroup(input: { name: $name, canSelfEnroll: $canSelfEnroll }) {
      group {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function GroupCreateModal({ visible, onRequestClose }: Props) {
  const [createGroup, { loading }] = useMutation<
    GroupCreateModalMutation,
    GroupCreateModalMutationVariables
  >(CREATE_GROUP);

  const handleFormSubmit = async (formData: GroupEditFormData) => {
    const { data } = await createGroup({
      variables: {
        name: formData.name,
        canSelfEnroll: formData.canSelfEnroll,
      },
      refetchQueries: ['AdminGroupsQuery'],
      awaitRefetchQueries: true,
    });

    data?.createGroup?.errors.forEach(error => message.error(error.message));

    if (data?.createGroup?.group) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New group"
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
      <GroupEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
