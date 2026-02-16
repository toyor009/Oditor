import { defineStore } from 'pinia';

import { useApiService } from '~/composables/useApiService';
import { useAuthToken } from '~/composables/useAuthToken';

import type { LoggedInUser } from '~/types/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const { token, setAccessToken, removeAccessToken } = useAuthToken();

  const loggedInUser = ref<LoggedInUser | null>(null);

  const isLoggedIn = computed(() => !!loggedInUser.value);

  const userHasABusiness = computed(
    () => (loggedInUser.value?.profileInfo?.businessProfiles || [])?.length > 0,
  );

  async function login(credentials: LoginCredentials) {
    const { data, error } = await useApiService<LoggedInUser>(
      '/web/authenticate-user',
      {
        method: 'POST',
        body: credentials,
      },
    );

    if (data.value) {
      setAccessToken(data.value?.accessToken);
      localStorage.setItem('user', JSON.stringify(data.value));
      loggedInUser.value = data.value;
    }

    return { data, error };
  }

  async function logout() {
    // TODO: Make API request to logout

    //Temporal fix
    loggedInUser.value = null;
    localStorage.removeItem('user');
    removeAccessToken();
    navigateTo('/auth/login', { replace: true });
  }

  async function fetchUser() {
    // TODO: Make API request to fetch user

    // Temporary fix
    if (!token.value) return;

    const userInfo = JSON.parse(localStorage.getItem('user') || '');
    if (!userInfo) return;

    loggedInUser.value = userInfo;
  }

  return {
    isLoggedIn,
    loggedInUser,
    userHasABusiness,
    login,
    logout,
    fetchUser,
  };
});
