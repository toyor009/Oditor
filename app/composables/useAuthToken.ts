import { computed } from 'vue';

const ID_TOKEN_KEY = 'id_token' as string;

export function useAuthToken() {
  const setAccessToken = (newToken: string) => {
    const encodedToken = btoa(encodeURIComponent(newToken));
    localStorage.setItem(ID_TOKEN_KEY, encodedToken);
  };

  const getAccessToken = () => {
    const token = localStorage.getItem(ID_TOKEN_KEY);
    if (!token) return '';

    try {
      return decodeURIComponent(atob(token));
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem(ID_TOKEN_KEY);
      return '';
    }
  };

  const removeAccessToken = () => {
    localStorage.removeItem(ID_TOKEN_KEY);
  };

  return {
    token: computed(() => getAccessToken()),
    setAccessToken,
    removeAccessToken,
  };
}
