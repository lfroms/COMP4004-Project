import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BookOutlined, ControlOutlined } from '@ant-design/icons';

import * as styles from './Frame.module.scss';

interface Props {
  children: React.ReactNode;
}

enum MenuItem {
  'admin',
  'courses',
}

export default function Frame(props: Props) {
  const { children } = props;
  const location = useLocation();
  const history = useHistory();

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
    if (pathnameMatches('/courses')) return MenuItem.courses;

    return MenuItem.courses;
  };

  return (
    <div className={styles.Frame}>
      <Layout.Sider collapsed theme="dark" className={styles.GlobalNav}>
        <div className={styles.Logo} />

        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey().toString()]}>
          <Menu.Item
            key={MenuItem.admin}
            icon={<ControlOutlined />}
            onClick={() => history.push('/admin')}
          >
            Admin
          </Menu.Item>
          <Menu.Item
            key={MenuItem.courses}
            icon={<BookOutlined />}
            onClick={() => history.push('/courses')}
          >
            Courses
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout.Content>{children}</Layout.Content>
    </div>
  );
}
