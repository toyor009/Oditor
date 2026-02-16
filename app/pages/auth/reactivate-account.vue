<template>
  <AccountReactivationPage />
</template>

<script setup lang="ts">
import AccountReactivationPage from '~/components/account-reactivation/index.vue';

defineOptions({ name: 'AccountReactivationPage' });

definePageMeta({
  layout: 'guest',
  pageTitle: 'Reactivate Account',
  // middleware: ['guest'],
});
</script>
