import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Form, Input, Space, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { useAuthState } from 'hooks';

import { AuthenticateMutation } from './graphql/AuthenticateMutation';

import * as styles from './Login.module.scss';

export default function Login() {
  const AUTHENTICATE = gql`
    mutation AuthenticateMutation($email: String!, $password: String!) {
      authenticate(input: { email: $email, password: $password }) {
        token
        errors {
          message
        }
      }
    }
  `;

  const [authenticate, { data }] = useMutation<AuthenticateMutation>(AUTHENTICATE);
  const [authenticated, setAuthenticated] = useAuthState();

  useEffect(() => {
    const hasData = !!data?.authenticate;
    const receivedToken = data?.authenticate?.token;

    if (!hasData || !receivedToken) {
      return;
    }

    setAuthenticated(true, receivedToken);
  }, [data?.authenticate?.token]);

  const handleFinish = async (values: { email: string; password: string }) => {
    const { data } = await authenticate({
      variables: { email: values.email, password: values.password },
    });

    data?.authenticate?.errors.forEach(error => message.error(error.message));
  };

  if (authenticated) {
    return <Redirect to="/courses" />;
  }

  return (
    <div className={styles.Login}>
      <Card className={styles.LoginCard}>
        <Form name="login" onFinish={handleFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input id="login_email_field" prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input
              id="login_password_field"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button id="login" type="primary" htmlType="submit">
                Log in
              </Button>

              <span>
                Or <Link to="/registration">register now!</Link>
              </span>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
