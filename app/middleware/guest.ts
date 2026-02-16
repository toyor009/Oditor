import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (auth.isLoggedIn && auth.loggedInUser?.accountStatus === 'Deactivated') {
    return navigateTo('/auth/reactivate-account', { replace: true });
  }

  if (auth.isLoggedIn && auth.userHasABusiness) {
    return navigateTo('/', { replace: true });
  }
});
