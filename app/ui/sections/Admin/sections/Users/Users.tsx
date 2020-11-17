import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { NavigationGroup, Page } from 'components';

export default function Users() {
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
      <Divider orientation="left">Users</Divider>
    </Page>
  );
}
