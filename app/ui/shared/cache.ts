import { InMemoryCache, makeVar } from '@apollo/client';
import { TOKEN } from './constants';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isAuthenticated: {
          read() {
            return isAuthenticatedVar();
          },
        },
      },
    },
  },
});

export const isAuthenticatedVar = makeVar<boolean>(!!localStorage.getItem(TOKEN));
