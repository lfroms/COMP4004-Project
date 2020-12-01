import { gql, useMutation } from '@apollo/client';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { UserEditForm, UserEditFormData } from '../UserEditForm';

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
    $admin: Boolean
  ) {
    createUser(input: { name: $name, email: $email, password: $password, admin: $admin }) {
      user {
        id
      }
    }
  }
`;

export default function UserCreateModal({ visible, onRequestClose }: Props) {
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const handleFormSubmit = async (data: UserEditFormData) => {
    console.log('in here');
    await createUser({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
        admin: data.admin,
      },
      refetchQueries: ['AdminUserIndexQuery'],
      awaitRefetchQueries: true,
    });

    onRequestClose?.();
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
