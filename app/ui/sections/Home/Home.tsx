import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { NavigationGroup, Page } from 'components';
import { gql, useQuery } from '@apollo/client';

export default function Home() {
  const GET_CUR_USER = gql`
    query CurrentUser {
      currentUser {
        name
      }
    }
  `;

  const { data, loading } = useQuery(GET_CUR_USER);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Page
      title="Home"
      subtitle="Subtitle"
      groups={groups}
      defaultOpenGroupId="test_group"
      defaultSelectedItemId="first"
    >
      {data?.currentUser && <div>Hello {data.currentUser.name}!</div>}
    </Page>
  );
}
