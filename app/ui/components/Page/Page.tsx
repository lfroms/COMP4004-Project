import React from 'react';
import { Layout, Menu, PageHeader } from 'antd';

import * as styles from './Page.module.scss';

export interface Group {
  id: string;
  icon: React.ReactNode;
  title: string;
  items?: Item[];
  onSelect?(): void;
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
  selectedItemId?: string;
  initialOpenGroupIds?: string[];
  children: React.ReactNode;
}

export default function Page(props: Props) {
  const { title, subtitle, onBack, groups, selectedItemId, initialOpenGroupIds, children } = props;

  const submenus = groups.map(group => {
    if (!group.items) {
      return (
        <Menu.Item key={group.id} icon={group.icon} onClick={group.onSelect}>
          {group.title}
        </Menu.Item>
      );
    }

    return (
      <Menu.SubMenu key={group.id} icon={group.icon} title={group.title}>
        {group.items.map(item => (
          <Menu.Item key={item.id} onClick={item.onSelect}>
            {item.title}
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    );
  });

  const sider = groups.length ? (
    <>
      <Layout.Sider width={240} className={styles.Menu}>
        <Menu
          mode="inline"
          defaultOpenKeys={initialOpenGroupIds}
          selectedKeys={selectedItemId ? [selectedItemId] : undefined}
          style={{ height: '100%', border: 'none' }}
        >
          {submenus}
        </Menu>
      </Layout.Sider>

      <div className={styles.Divider} />
    </>
  ) : null;

  return (
    <div className={styles.Page}>
      <PageHeader title={title} subTitle={subtitle} onBack={onBack} />

      <div className={styles.ContentWrapper}>
        {sider}
        <div className={styles.Content}>{children}</div>
      </div>
    </div>
  );
}
