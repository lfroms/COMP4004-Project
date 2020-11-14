import { HomeOutlined } from '@ant-design/icons';
import { NavigationGroup, Page } from 'components';
import React from 'react';

export default function Home() {
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
      title="Home"
      subtitle="Subtitle"
      groups={groups}
      defaultOpenGroupId="test_group"
      defaultSelectedItemId="first"
    >
      <div>Hello world!</div>
    </Page>
  );
}
