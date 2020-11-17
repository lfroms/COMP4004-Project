import React from 'react';
import { NavigationGroup, Page } from 'components';
import { HomeOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';
import { Divider } from 'antd';

export default function Admin() {
  const GET_ALL_USERS = gql`
    query Users {
      users {
        edges {
          node {
            name
            email
            approved
            admin
          }
        }
      }
    }
  `;

  const { data } = useQuery(GET_ALL_USERS);

  if (data) {
    console.log(data);
  }

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
      <Divider orientation="left">Administrators</Divider>

      <div>Admin index</div>
    </Page>
  );
}
