import { gql, useQuery } from '@apollo/client';
import React, { createContext } from 'react';
import { CurrentUserContextQuery } from './graphql/CurrentUserContextQuery';

const CURRENT_USER = gql`
  query CurrentUserContextQuery {
    currentUser {
      id
    }
  }
`;

interface Props {
  children: React.ReactNode;
}

interface Value {
  id?: string;
}

export const CurrentUserContext = createContext<Value>({});

export default function CurrentUserContextProvider({ children }: Props) {
  const { data } = useQuery<CurrentUserContextQuery>(CURRENT_USER);

  const value: Value = {
    id: data?.currentUser?.id,
  };

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}
