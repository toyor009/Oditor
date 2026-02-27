import { useAuthStore } from '~/stores/useAuthStore';
import { useBusinessStore } from '~/stores/useBusinessStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const businessStore = useBusinessStore();

  if (auth.isLoggedIn) {
    if (auth.loggedInUser?.accountStatus === 'Deactivated') {
      return navigateTo('/auth/reactivate-account', { replace: true });
    }

    if (
      businessStore.userBusinesses.length > 1 &&
      !auth.loggedInUser?.selectedBusinessKey
    ) {
      return navigateTo('/auth/choose-business', { replace: true });
    }

    if (
      businessStore.userBusinesses &&
      auth.loggedInUser?.selectedBusinessKey
    ) {
      return navigateTo('/', { replace: true });
    }
  }
});
