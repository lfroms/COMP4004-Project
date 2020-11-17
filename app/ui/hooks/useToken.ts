import useLocalStorage from './useLocalStorage';

export default function useToken(): [string | undefined, (newValue?: string) => void] {
  const [token, setToken] = useLocalStorage<string | undefined>('token');

  return [token, setToken];
}
