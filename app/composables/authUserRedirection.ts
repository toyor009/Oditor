import { useAuthStore } from '~/stores/useAuthStore';
import { useBusinessStore } from '~/stores/useBusinessStore';

export function authUserRedirection() {
  const authStore = useAuthStore();
  const businessStore = useBusinessStore();

  const handleRedirection = () => {
    if (authStore.loggedInUser?.accountStatus === 'Deactivated') {
      navigateTo('/auth/reactivate-account', { replace: true });
      return;
    }

    const userBusinesses = businessStore.userBusinesses;

    if (!userBusinesses?.length) {
      navigateTo('/auth/no-business', { replace: true });
      return;
    }

    if (userBusinesses?.length === 1) {
      navigateTo('/', { replace: true });
      return;
    }

    if (userBusinesses?.length > 1) {
      navigateTo('/auth/choose-business', { replace: true });
      return;
    }
  };

  return {
    handleRedirection,
  };
}
