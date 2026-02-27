import { useAuthStore } from '~/stores/useAuthStore';
import { useBusinessStore } from '~/stores/useBusinessStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const businessStore = useBusinessStore();

  if (
    !auth.isLoggedIn ||
    auth.loggedInUser?.accountStatus === 'Deactivated' ||
    businessStore.userBusinesses?.length !== 0
  ) {
    return navigateTo('/auth/login', { replace: true });
  }
});
