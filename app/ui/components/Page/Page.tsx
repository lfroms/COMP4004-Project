import React from 'react';
import { Layout, Menu, PageHeader } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import * as styles from './Page.module.scss';

interface Props {
  title: string;
  subtitle: string;
  onBack?: () => void;
  children: React.ReactNode;
}

export default function Page(props: Props) {
  const { title, subtitle, onBack, children } = props;

  return (
    <div className={styles.Page}>
      <PageHeader title={title} subTitle={subtitle} onBack={onBack} />

      <div className={styles.ContentWrapper}>
        <Layout.Sider width={240} className={styles.Menu}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', border: 'none' }}
          >
            <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>

        <div className={styles.Divider} />

        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  );
}
