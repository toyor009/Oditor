import { defineStore } from 'pinia';

import { useApiService } from '~/composables/useApiService';
import { useAuthStore } from '~/stores/useAuthStore';
import { useAuthToken } from '~/composables/useAuthToken';

import type { LoggedInUser } from '~/types/auth';

export const useBusinessStore = defineStore('business', () => {
  const authStore = useAuthStore();
  const { setAccessToken } = useAuthToken();

  const userBusinesses = computed(
    () => authStore.loggedInUser?.profileInfo?.businessProfiles || [],
  );

  /*
  // Multiple businesses simulation
  // TODO: Remove later

  const userBusinesses = computed(() => {
    const businesses = [
      ...(authStore.loggedInUser?.profileInfo?.businessProfiles || []),
      ...(authStore.loggedInUser?.profileInfo?.businessProfiles || []),
      ...(authStore.loggedInUser?.profileInfo?.businessProfiles || []),
    ];

    return businesses.map((b, index) => ({
      ...b,
      businessKey: index === 1 ? b.businessKey : `${index}-${b.businessKey}`,
    }));
  });

  */

  const userHasABusiness = computed(() => userBusinesses.value.length > 0);

  const currentBusinessKey = computed(
    () => authStore.loggedInUser?.profileInfo?.currentBusinessKey,
  );

  async function swtichBusiness(businessKey: string) {
    const { data, error } = await useApiService<LoggedInUser>(
      `/web/switch-business/${businessKey}`,
      {
        method: 'GET',
      },
    );

    if (data.value) {
      setAccessToken(data.value.accessToken);
      authStore.setLoggedInUser({
        ...data.value,
        selectedBusinessKey: businessKey,
      });
    }

    return { data, error };
  }

  return {
    userBusinesses,
    userHasABusiness,
    currentBusinessKey,
    swtichBusiness,
  };
});
