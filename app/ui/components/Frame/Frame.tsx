import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { BookOutlined, CalendarOutlined, ControlOutlined, LogoutOutlined } from '@ant-design/icons';
import { CurrentUserContext } from 'foundation';

import carletonLogo from './images/carleton.png';
import * as styles from './Frame.module.scss';

interface Props {
  children: React.ReactNode;
}

enum MenuItem {
  'admin',
  'enrollments',
  'terms',
  'logout',
}

export default function Frame(props: Props) {
  const { user } = useContext(CurrentUserContext);
  const { children } = props;

  const history = useHistory();
  const location = useLocation();

  const pathnameMatches = (string: string) => {
    return location.pathname.includes(string);
  };

  const getSelectedKey: () => MenuItem = () => {
    if (pathnameMatches('/admin')) return MenuItem.admin;
    if (pathnameMatches('/terms')) return MenuItem.terms;
    if (pathnameMatches('/courses')) return MenuItem.enrollments;
    if (pathnameMatches('/logout')) return MenuItem.logout;

    return MenuItem.terms;
  };

  const adminItem = user?.admin ? (
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
        <div className={styles.MenuContainer}>
          <div>
            <div className={styles.LogoContainer}>
              <img src={carletonLogo} className={styles.Logo} />
            </div>

            <Menu theme="dark" mode="vertical" selectedKeys={[getSelectedKey().toString()]}>
              {adminItem}

              <Menu.Item
                key={MenuItem.enrollments}
                icon={<BookOutlined />}
                onClick={() => history.push('/courses')}
              >
                Courses
              </Menu.Item>

              <Menu.Item
                key={MenuItem.terms}
                icon={<CalendarOutlined />}
                onClick={() => history.push('/terms')}
              >
                Course Directory
              </Menu.Item>
            </Menu>
          </div>

          <div className={styles.Options}>
            <Typography.Text className={styles.UserName}>{user?.name}</Typography.Text>

            <Menu theme="dark" mode="vertical" selectedKeys={[getSelectedKey().toString()]}>
              <Menu.Item
                key={MenuItem.logout}
                id="global_log_out"
                icon={<LogoutOutlined />}
                onClick={() => history.push('/logout')}
              >
                Log out
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Layout.Sider>

      <Layout.Content>{children}</Layout.Content>
    </div>
  );
}
