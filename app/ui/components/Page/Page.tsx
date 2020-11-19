import React from 'react';
import { Layout, Menu, PageHeader } from 'antd';

import * as styles from './Page.module.scss';

export interface Group {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: Item[];
}

interface Item {
  id: string;
  title: string;
  onSelect?: () => void;
}

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  groups: Group[];
  defaultSelectedItemId: string;
  defaultOpenGroupId: string;
  children: React.ReactNode;
}

export default function Page(props: Props) {
  const {
    title,
    subtitle,
    onBack,
    groups,
    defaultSelectedItemId,
    defaultOpenGroupId,
    children,
  } = props;

  const submenus = groups.map(group => (
    <Menu.SubMenu key={group.id} icon={group.icon} title={group.title}>
      {group.items.map(item => (
        <Menu.Item key={item.id} onClick={item.onSelect}>
          {item.title}
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  ));

  return (
    <div className={styles.Page}>
      <PageHeader title={title} subTitle={subtitle} onBack={onBack} />

      <div className={styles.ContentWrapper}>
        <Layout.Sider width={240} className={styles.Menu}>
          <Menu
            mode="inline"
            defaultOpenKeys={[defaultOpenGroupId]}
            defaultSelectedKeys={[defaultSelectedItemId]}
            style={{ height: '100%', border: 'none' }}
          >
            {submenus}
          </Menu>
        </Layout.Sider>

        <div className={styles.Divider} />

        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  );
}
