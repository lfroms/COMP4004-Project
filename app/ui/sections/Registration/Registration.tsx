import React, { useState } from 'react';
import { Alert, Button, Card, Form, Input, Typography, message } from 'antd';

import * as styles from './Registration.module.scss';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const FORM_NAME = 'user_registration_form';

export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

const REGISTER_USER = gql`
  mutation RegistrationMutation($name: String!, $email: String!, $password: String!) {
    registerUser(input: { name: $name, email: $email, password: $password }) {
      user {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function Registration() {
  const { Title } = Typography;
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  const handleFormSubmit = async (formData: RegistrationFormData) => {
    const { data } = await registerUser({
      variables: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    });

    data?.registerUser?.errors.forEach((error: any) => message.error(error.message));

    if (data?.registerUser?.user) {
      setRegistrationCompleted(true);
    }
  };

  const cardContentMarkup = registrationCompleted ? (
    <Alert
      message={<Title level={3}>Account created successfully</Title>}
      description={<Link to="/login">Return to login screen</Link>}
      type="success"
    />
  ) : (
    <>
      <Form name={FORM_NAME} onFinish={handleFormSubmit}>
        <Form.Item
          name="name"
          hasFeedback
          rules={[{ required: true, message: 'You must enter a name' }]}
        >
          <Input id="user_name_field" placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          hasFeedback
          rules={[
            { required: true, message: 'You must enter an email' },
            {
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Email must have the form x@x.x',
            },
          ]}
        >
          <Input id="user_email_field" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            { required: true, message: 'You must enter a password' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password id="user_password_field" placeholder="Password" />
        </Form.Item>
      </Form>
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
      <Card className={styles.RegistrationCard}>{cardContentMarkup}</Card>
    </div>
  );
}
