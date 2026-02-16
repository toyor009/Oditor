<template>
  <LoginPage />
</template>

<script setup lang="ts">
import LoginPage from '~/components/login/index.vue';

defineOptions({ name: 'LoginPage' });

definePageMeta({
  layout: 'guest',
  pageTitle: 'Login',
  middleware: ['guest'],
});
</script>
