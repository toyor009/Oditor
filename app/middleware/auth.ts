import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  const businessSelected = () => !!auth.loggedInUser?.selectedBusinessKey;
  const allowInterLayoutRedirect = () =>
    auth.isLoggedIn && businessSelected() && to.path === '/';

  if (from?.meta?.layout !== 'app') return allowInterLayoutRedirect();

  if (!auth.isLoggedIn || !businessSelected()) {
    return navigateTo('/auth/login', { replace: true });
  }
});
