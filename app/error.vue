<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h2>{{ error?.status }}</h2>
    <p>Page not found</p>

    <UButton class="mt-6" @click="goHome"> Go to home page </UButton>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

function goHome() {
  clearError();
  navigateTo('/auth/login', { replace: true });
}
</script>
