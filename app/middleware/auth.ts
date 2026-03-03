import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
  if (from.meta.layout !== "app") return to.path === "/";

  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    return navigateTo("/auth/login", { replace: true });
  }
});
