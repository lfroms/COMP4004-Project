import React from 'react';
import { NavigationGroup, Page } from 'components';
import { HomeOutlined } from '@ant-design/icons';

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
      title="Administrators"
      subtitle="test"
      groups={groups}
      defaultOpenGroupId="test_group"
      defaultSelectedItemId="first"
    >
      <div>Admin index</div>
    </Page>
  );
}
