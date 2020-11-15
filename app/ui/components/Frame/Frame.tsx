import React from 'react';
import { Layout, Menu } from 'antd';
import { ControlOutlined } from '@ant-design/icons';

import * as styles from './Frame.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function Frame(props: Props) {
  const { children } = props;

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
