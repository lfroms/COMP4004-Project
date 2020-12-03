import { gql, useMutation } from '@apollo/client';
import { Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { UserEditForm, UserEditFormData } from '../UserEditForm';
import {
  CreateUserModalMutation,
  CreateUserModalMutationVariables,
} from './graphql/CreateUserModalMutation';

const FORM_NAME = 'userCreateForm';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
}

const CREATE_USER = gql`
  mutation CreateUserModalMutation(
    $name: String!
    $email: String!
    $password: String!
    $admin: Boolean!
  ) {
    createUser(input: { name: $name, email: $email, password: $password, admin: $admin }) {
      user {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function UserCreateModal({ visible, onRequestClose }: Props) {
  const [createUser, { loading }] = useMutation<
    CreateUserModalMutation,
    CreateUserModalMutationVariables
  >(CREATE_USER);

  const handleFormSubmit = async (formData: UserEditFormData) => {
    const { data } = await createUser({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        admin: formData.admin,
      },
      refetchQueries: ['AdminUserIndexQuery'],
      awaitRefetchQueries: true,
    });

    data?.createUser?.errors.forEach(error => message.error(error.message));

    if (data?.createUser?.user) {
      onRequestClose?.();
    }
  };

  return (
    <Modal
      title="New user"
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
      <UserEditForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
