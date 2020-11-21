import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import { useToken } from 'hooks';
import { AuthenticateMutation } from './graphql/AuthenticateMutation';

import * as styles from './Login.module.scss';

export default function Login() {
  const AUTHENTICATE = gql`
    mutation AuthenticateMutation($email: String!, $password: String!) {
      authenticate(input: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const [token, setToken] = useToken();
  const [authenticate, { data }] = useMutation<AuthenticateMutation>(AUTHENTICATE);

  useEffect(() => {
    const hasData = !!data?.authenticate;
    const receivedToken = data?.authenticate?.token;

    if (!hasData) {
      return;
    }

    if (!receivedToken) {
      window.alert('Invalid credentials');

      return;
    }

    setToken(receivedToken);
  }, [data?.authenticate?.token]);

  const handleFinish = (values: { email: string; password: string }) => {
    authenticate({ variables: { email: values.email, password: values.password } });
  };

  if (token) {
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
            <Input prefix={<UserOutlined />} placeholder="Email" />
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
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>

              <span>
                Or <a href="">register now!</a>
              </span>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
