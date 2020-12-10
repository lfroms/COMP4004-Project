import { useEffect } from 'react';
import { isAuthenticatedVar } from 'shared/cache';
import { TOKEN } from 'shared/constants';

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem(TOKEN);
    isAuthenticatedVar(false);
  });

  return null;
}
