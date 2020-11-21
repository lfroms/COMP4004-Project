import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ControlOutlined } from '@ant-design/icons';

import * as styles from './Frame.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Frame(props: Props) {
  const { children } = props;
  const location = useLocation();

  if (location.pathname.match(/login/)) {
    return (
      <div className={styles.Frame}>
        <Layout.Content>{children}</Layout.Content>
      </div>
    );
  }

  return (
    <div className={styles.Frame}>
      <Layout.Sider collapsed theme="dark" className={styles.GlobalNav}>
        <div className={styles.Logo} />

        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<ControlOutlined />}>
            Admin
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout.Content>{children}</Layout.Content>
    </div>
  );
}
