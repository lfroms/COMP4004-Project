import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BookOutlined, CalendarOutlined, ControlOutlined } from '@ant-design/icons';
import { FrameQuery } from './graphql/FrameQuery';

import * as styles from './Frame.module.scss';

interface Props {
  children: React.ReactNode;
}

enum MenuItem {
  'admin',
  'enrollments',
  'offerings',
}

export default function Frame(props: Props) {
  const USER_IS_ADMIN = gql`
    query FrameQuery {
      currentUser {
        admin
      }
    }
  `;

  const { children } = props;
  const location = useLocation();
  const history = useHistory();
  const { data } = useQuery<FrameQuery>(USER_IS_ADMIN);

  const pathnameMatches = (string: string) => {
    return location.pathname.includes(string);
  };

  if (pathnameMatches('/login')) {
    return (
      <div className={styles.Frame}>
        <Layout.Content>{children}</Layout.Content>
      </div>
    );
  }

  const getSelectedKey: () => MenuItem = () => {
    if (pathnameMatches('/admin')) return MenuItem.admin;
    if (pathnameMatches('/courses/all')) return MenuItem.offerings;
    if (pathnameMatches('/courses')) return MenuItem.enrollments;

    return MenuItem.offerings;
  };

  const adminItem = data?.currentUser?.admin ? (
    <Menu.Item
      key={MenuItem.admin}
      icon={<ControlOutlined />}
      onClick={() => history.push('/admin')}
    >
      Admin
    </Menu.Item>
  ) : null;

  return (
    <div className={styles.Frame}>
      <Layout.Sider collapsed theme="dark" className={styles.GlobalNav}>
        <div className={styles.Logo} />

        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey().toString()]}>
          {adminItem}

          <Menu.Item
            key={MenuItem.enrollments}
            icon={<BookOutlined />}
            onClick={() => history.push('/courses')}
          >
            Courses
          </Menu.Item>

          <Menu.Item
            key={MenuItem.offerings}
            icon={<CalendarOutlined />}
            onClick={() => history.push('/courses/all')}
          >
            Course Directory
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout.Content>{children}</Layout.Content>
    </div>
  );
}
