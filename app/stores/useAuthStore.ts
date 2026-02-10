import { defineStore } from "pinia";

interface User {
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  const loggedInUser = ref<User | null>(null);

  const isLoggedIn = computed(() => !!loggedInUser.value);

  async function login(credentials: LoginCredentials) {
    // TODO: Implement the actual login logic

    //Temporal login mechanism
    const { email } = credentials;
    localStorage.setItem("user", email);
    loggedInUser.value = { email };

    return { data: { success: true }, error: null };
  }

  async function logout() {
    // TODO: Make API request to logout

    //Temporal fix
    loggedInUser.value = null;
    localStorage.removeItem("user");
    navigateTo("/auth/login", { replace: true });
  }

  async function fetchUser() {
    // TODO: Make API request to fetch user

    // Temporary fix
    const userEmail = localStorage.getItem("user");
    if (!userEmail) return;

    loggedInUser.value = { email: userEmail };
  }

  return {
    isLoggedIn,
    login,
    logout,
    fetchUser,
  };
});
