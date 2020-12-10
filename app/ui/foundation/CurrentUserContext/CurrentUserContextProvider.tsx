import { gql, useQuery } from '@apollo/client';
import React, { createContext } from 'react';
import { CurrentUserContextQuery } from './graphql/CurrentUserContextQuery';

const CURRENT_USER = gql`
  query CurrentUserContextQuery {
    currentUser {
      id
      name
      admin
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

interface Value {
  user?: {
    id: string;
    name: string;
    admin: boolean;
  };
}

export const CurrentUserContext = createContext<Value>({});

export default function CurrentUserContextProvider({ children }: Props) {
  const { data } = useQuery<CurrentUserContextQuery>(CURRENT_USER);

  const value: Value = {
    user: data?.currentUser ?? undefined,
  };

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
