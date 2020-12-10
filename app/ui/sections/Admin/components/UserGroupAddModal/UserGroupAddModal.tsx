import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Modal, message } from 'antd';
import { UserGroupEditForm, UserGroupEditFormData } from '../UserGroupEditForm';
import {
  UserGroupAddModalMutation,
  UserGroupAddModalMutationVariables,
} from './graphql/UserGroupAddModalMutation';

const FORM_NAME = 'userGroupAddForm';

interface Props {
  groupId: string;
  visible: boolean;
  onRequestClose?: () => void;
}

const CREATE_USER = gql`
  mutation UserGroupAddModalMutation($userId: ID!, $groupId: ID!) {
    addUserToGroup(input: { userId: $userId, groupId: $groupId }) {
      errors {
        message
      }
    }
  }
`;

export default function UserCreateModal({ groupId, visible, onRequestClose }: Props) {
  const [createUser, { loading }] = useMutation<
    UserGroupAddModalMutation,
    UserGroupAddModalMutationVariables
  >(CREATE_USER, {
    refetchQueries: ['AdminGroupShowQuery'],
    awaitRefetchQueries: true,
  });

  const handleFormSubmit = async (formData: UserGroupEditFormData) => {
    const { data } = await createUser({
      variables: {
        groupId,
        userId: formData.userId,
      },
    });

    data?.addUserToGroup?.errors.forEach(error => message.error(error.message));

    if (!data?.addUserToGroup?.errors.length) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="Add group member"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button form={FORM_NAME} key="submit" htmlType="submit" type="primary" loading={loading}>
          Add
        </Button>,
      ]}
    >
      <UserGroupEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
