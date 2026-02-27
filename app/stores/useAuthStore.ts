import { defineStore } from 'pinia';

import { useApiService } from '~/composables/useApiService';
import { useAuthToken } from '~/composables/useAuthToken';

import type { LoggedInUser, UserProfile } from '~/types/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const { token, setAccessToken, removeAccessToken } = useAuthToken();

  const loggedInUser = ref<LoggedInUser | null>(null);

  const isLoggedIn = computed(() => !!loggedInUser.value);

  const userHasABusiness = computed(() => userBusinesses.value.length > 0);

  // const userBusinesses = computed(
  //   () => loggedInUser?.value?.profileInfo?.businessProfiles || [],
  // );

  const userBusinesses = computed(() => {
    const businesses = [
      ...(loggedInUser?.value?.profileInfo?.businessProfiles || []),
      ...(loggedInUser?.value?.profileInfo?.businessProfiles || []),
      ...(loggedInUser?.value?.profileInfo?.businessProfiles || []),
    ];

    return businesses.map((b, index) => ({
      ...b,
      businessKey: index === 1 ? b.businessKey : `${index}-${b.businessKey}`,
    }));
  });

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
      loggedInUser.value = data.value;

      if (!data.value?.profileInfo)
        loggedInUser.value.profileInfo = {
          ...loggedInUser.value.profileInfo,
          email: credentials.email,
        } as UserProfile;

      localStorage.setItem('user', JSON.stringify(loggedInUser.value));
    }

    return { data, error };
  }

  async function logout() {
    // TODO: Make API request to logout

    //Temporal fix
    loggedInUser.value = null;
    removeAccessToken();
    navigateTo('/auth/login', { replace: true });
    localStorage.clear();
  }

  async function fetchUser() {
    // TODO: Make API request to fetch user

    // Temporary fix
    if (!token.value) return;

    const userInfo = JSON.parse(localStorage.getItem('user') || '');
    if (!userInfo) return;

    loggedInUser.value = userInfo;
  }

  async function sendOtp() {
    const { data, error } = await useApiService<{
      otpKey: string;
      email: string;
    }>('/web/request-user-account-activation-otp', {
      method: 'POST',
    });

    if (data.value) {
      localStorage.setItem('otpKey', data.value.otpKey);
    }

    return { data, error };
  }

  async function reactivateAccount(otpDetails: {
    accountActivationKey: string;
    accountActivationOtp: string;
  }) {
    const { accountActivationOtp, accountActivationKey } = otpDetails;
    const { data, error } = await useApiService<LoggedInUser>(
      '/web/activate-user-account',
      {
        method: 'PUT',
        body: { accountActivationOtp, accountActivationKey },
      },
    );

    if (data.value) {
      setAccessToken(data.value?.accessToken);
      loggedInUser.value = data.value;
      localStorage.setItem('user', JSON.stringify(data.value));
      localStorage.removeItem('otpKey');
    }

    return { data, error };
  }

  return {
    isLoggedIn,
    loggedInUser,
    userHasABusiness,
    userBusinesses,
    login,
    logout,
    fetchUser,
    sendOtp,
    reactivateAccount,
  };
});
