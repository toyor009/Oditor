<template>
  <div class="flex flex-col flex-1">
    <NuxtImg src="/images/logo-1.png" class="w-22" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';

defineOptions({ name: 'SalesPage' });

definePageMeta({
  layout: 'guest',
  pageTitle: 'Login',
  middleware: ['guest'],
});

const auth = useAuthStore();

async function login() {
  const { data } = await auth.login({ email: 'test@mail.com', password: '' });

  if (data.success) navigateTo('/', { replace: true });
}
</script>
