import { gql, useQuery } from '@apollo/client';
import { isAuthenticatedVar } from 'shared/cache';
import { TOKEN } from 'shared/constants';
import { UserIsAuthenticatedQuery } from './graphql/UserIsAuthenticatedQuery';

const IS_AUTHENTICATED = gql`
  query UserIsAuthenticatedQuery {
    isAuthenticated @client
  }
`;

export default function useAuthState(): [
  boolean,
  (authenticated: boolean, token?: string) => void
] {
  const { data } = useQuery<UserIsAuthenticatedQuery>(IS_AUTHENTICATED);

  const authenticated = data?.isAuthenticated ?? !!localStorage.getItem(TOKEN);

  const setAuthenticated = (authenticated: boolean, token?: string) => {
    isAuthenticatedVar(authenticated);

    if (authenticated && token) {
      localStorage.setItem(TOKEN, token);
    } else {
      localStorage.removeItem(TOKEN);
    }
  };

  return [authenticated, setAuthenticated];
}
