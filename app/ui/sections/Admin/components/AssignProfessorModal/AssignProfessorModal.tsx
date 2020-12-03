import React from 'react';
import { Button, Modal } from 'antd';
import { AssignProfessorForm, AssignProfessorFormData } from '..';
import { gql, useMutation } from '@apollo/client';
import {
  AssignProfessorModalMutation,
  AssignProfessorModalMutationVariables,
} from './graphql/AssignProfessorModalMutation';

const FORM_NAME = 'assignProffessorForm';
interface Props {
  visible: boolean;
  onRequestClose?: () => void;
}

const ASSIGN_PROFESSOR = gql`
  mutation AssignProfessorModalMutation($role: String!, $userId: ID!, $offeringId: ID!) {
    createEnrollment(input: { role: $role, userId: $userId, offeringId: $offeringId }) {
      enrollment {
        id
        user {
          id
        }
      }
    }
  }
`;

export default function AssignProfessorModal(props: Props) {
  const { visible, onRequestClose } = props;

  const [assignProfessor, { loading }] = useMutation<
  AssignProfessorModalMutation,
  AssignProfessorModalMutationVariables
  >(ASSIGN_PROFESSOR);

  const handleFormSubmit = async (data: AssignProfessorFormData) => {
    await assignProfessor({
      variables: {
        role: 'professor',
        userId: data.userId,
        offeringId: data.offeringId,
      },
      // refetchQueries: ['AdminCourseIndexQuery', 'AdminCourseShowQuery'], fetch professor
      // awaitRefetchQueries: true,
    });

    onRequestClose?.();
  };

  return (
    <Modal
      title="Assign professor"
      visible={visible}
      onCancel={onRequestClose}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button
          id="assign_prof_submit"
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
      <AssignProfessorForm name={FORM_NAME} onSubmit={handleFormSubmit} />
    </Modal>
  );
}
