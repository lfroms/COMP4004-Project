import React from 'react';
import { NavigationGroup, Page } from 'components';
import { UserOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';

export default function EnrollmentIndex() {
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
      title="Courses"
      groups={groups}
      initialOpenGroupIds={['users_and_groups']}
      selectedItemId={
        location.pathname.includes('/admin/users') ? '/admin/users' : location.pathname
      }
    >
      <div>hi</div>
    </Page>
  );
}
