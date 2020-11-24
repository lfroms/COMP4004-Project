import React from 'react';
import { NavigationGroup, Page } from 'components';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { OfferingIndex } from './sections';

export default function Offerings() {
  const history = useHistory();
  const location = useLocation();

  const groups: NavigationGroup[] = [
    {
      id: 'users_and_groups',
      title: 'Users and groups',
      icon: <UserOutlined />,
      items: [
        {
          id: '/admin/users',
          title: 'Users',
          onSelect: () => history.push('/admin/users'),
        },
        {
          id: '/admin/groups',
          title: 'Groups',
          onSelect: () => history.push('/admin/groups'),
        },
      ],
    },
    {
      id: 'terms',
      title: 'Terms',
      icon: <CalendarOutlined />,
      onClick: () => history.push('/admin/terms'),
      items: [],
    },
  ];

  return (
    <Page
      title="Course Directory"
      groups={groups}
      defaultOpenGroupId="users_and_groups"
      defaultSelectedItemId={
        location.pathname.includes('/admin/users') ? '/admin/users' : location.pathname
      }
    >
      <Switch>
        <Route exact path="/courses/all" component={OfferingIndex} />
      </Switch>
    </Page>
  );
}
