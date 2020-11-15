import React from 'react';
import  { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';

export default function Login() {
  const AUTHENTICATE = gql`
    mutation Authenticate($email: String!, $password: String!) {
      authenticate(input: {email: $email, password: $password}) {
        token
      }
    }
  `;

  const [authenticate, {data}] = useMutation(AUTHENTICATE);

  if (data?.authenticate?.token) {
    localStorage.setItem('token', data.authenticate.token)
    return <Redirect to='/courses'/>
  }

  if (data?.authenticate) {
    console.log("Invalid login")
  }

  const onFinish = (values: {email: String, password: String}) => {
    authenticate({variables: {email: values.email, password: values.password}})
  }

  return (
    <Form
      name="login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}
