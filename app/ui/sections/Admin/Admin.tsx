import React from 'react';
import { NavigationGroup, Page } from 'components';
import { HomeOutlined } from '@ant-design/icons';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Users } from './sections';

export default function Admin() {
  const groups: NavigationGroup[] = [
    {
      id: 'test_group',
      title: 'Test group',
      icon: <HomeOutlined />,
      items: [
        {
          id: 'first',
          title: 'First test item',
          onSelect: () => console.log('testing'),
        },
      ],
    },
  ];

  return (
    <Page
      title="Admin"
      subtitle="test"
      groups={groups}
      defaultOpenGroupId="test_group"
      defaultSelectedItemId="first"
    >
      <Switch>
        <Route exact path="/admin/users" component={Users} />
        <Redirect path="/admin" to="/admin/users" />
      </Switch>
    </Page>
  );
}
