import React from 'react';
import { NavigationGroup, Page } from 'components';
import { UserOutlined } from '@ant-design/icons';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { Groups, UserDetails, Users } from './sections';

export default function Admin() {
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
  ];

  return (
    <Page
      title="Admin"
      groups={groups}
      defaultOpenGroupId="users_and_groups"
      defaultSelectedItemId={location.pathname}
    >
      <Switch>
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/users/:userId" component={UserDetails} />
        <Route exact path="/admin/groups" component={Groups} />
        <Redirect path="/admin" to="/admin/users" />
      </Switch>
    </Page>
  );
}
