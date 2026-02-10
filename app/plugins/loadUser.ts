import { defineNuxtPlugin } from '#imports';
import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtPlugin(async (_nuxtApp) => {
  const auth = useAuthStore();
  const user = localStorage.getItem('user');

  if (!auth.isLoggedIn && user) {
    await auth.fetchUser();
  }
});
