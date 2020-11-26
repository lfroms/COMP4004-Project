import React from 'react';
import { NavigationGroup, Page } from 'components';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import {
  Groups,
  OfferingIndex,
  OfferingShow,
  TermIndex,
  TermShow,
  UserIndex,
  UserShow,
} from './sections';

export default function Admin() {
  const history = useHistory();
  const location = useLocation();

  const pathnameMatches = (string: string) => {
    return location.pathname.includes(string);
  };

  const groups: NavigationGroup[] = [
    {
      id: 'usersGroups',
      title: 'Users and groups',
      icon: <UserOutlined />,
      items: [
        {
          id: 'users',
          title: 'Users',
          onSelect: () => history.push('/admin/users'),
        },
        {
          id: 'groups',
          title: 'Groups',
          onSelect: () => history.push('/admin/groups'),
        },
      ],
    },
    {
      id: 'terms',
      title: 'Terms',
      icon: <CalendarOutlined />,
      onSelect: () => history.push('/admin/terms'),
    },
    {
      id: 'offerings',
      title: 'Course offerings',
      icon: <ClockCircleOutlined />,
      onSelect: () => history.push('/admin/offerings'),
    },
  ];

  const getSelectedKey = () => {
    if (pathnameMatches('/admin/users')) return 'users';
    if (pathnameMatches('/admin/groups')) return 'groups';
    if (pathnameMatches('/admin/terms')) return 'terms';
    if (pathnameMatches('/admin/offerings')) return 'offerings';

    return 'users';
  };

  return (
    <Page
      title="Admin"
      groups={groups}
      initialOpenGroupIds={['usersGroups']}
      selectedItemId={getSelectedKey()}
    >
      <Switch>
        <Route exact path="/admin/users" component={UserIndex} />
        <Route exact path="/admin/users/:userId" component={UserShow} />
        <Route exact path="/admin/groups" component={Groups} />
        <Route exact path="/admin/terms" component={TermIndex} />
        <Route exact path="/admin/terms/:termId" component={TermShow} />
        <Route exact path="/admin/offerings" component={OfferingIndex} />
        <Route exact path="/admin/offerings/:offeringId" component={OfferingShow} />
        <Redirect path="/admin" to="/admin/users" />
      </Switch>
    </Page>
  );
}
