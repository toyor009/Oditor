import { useAuthStore } from '~/stores/useAuthStore';
import { useBusinessStore } from '~/stores/useBusinessStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const businessStore = useBusinessStore();

  if (!auth.isLoggedIn || businessStore.userBusinesses.length < 2) {
    return navigateTo('/auth/login', { replace: true });
  }

  if (auth.loggedInUser?.selectedBusinessKey) {
    return navigateTo('/', { replace: true });
  }
});
