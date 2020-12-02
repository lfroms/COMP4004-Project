import React, { useState } from 'react';
import { Alert, Button, Card, Typography } from 'antd';

import { UserEditForm, UserEditFormData } from '../Admin/components/UserEditForm';

import * as styles from './Registration.module.scss';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const FORM_NAME = 'user_registration_form';

const REGISTER_USER = gql`
  mutation RegistrationMutation($name: String!, $email: String!, $password: String!) {
    registerUser(input: { name: $name, email: $email, password: $password }) {
      user {
        id
      }
    }
  }
`;

export default function Registration() {
  const { Title } = Typography;

  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => setRegistrationCompleted(true),
    onError: error => console.log(error.message.split('GraphQL error: ')[1]),
  });

  const handleFormSubmit = async (data: UserEditFormData) => {
    await registerUser({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  };

  const cardContentMarkup = registrationCompleted ? (
    <Alert
      message={<Title level={3}>Account created successfully</Title>}
      description={<Link to="/login">Return to login screen</Link>}
      type="success"
    />
  ) : (
    <>
      <UserEditForm name={FORM_NAME} registration onSubmit={handleFormSubmit} />
      <Button
        id="register_button"
        form={FORM_NAME}
        key="submit"
        htmlType="submit"
        type="primary"
        loading={loading}
      >
        Register new account
      </Button>
    </>
  );

  return (
    <div className={styles.Registration}>
      <Card className={styles.RegistrationCard}>
        {/* {errorAlert} */}
        {cardContentMarkup}
      </Card>
    </div>
  );
}
