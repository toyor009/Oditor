<template>
  <div>
    <AppStoreLinks title="No Business Yet" :description="pageMessage" />

    <LogoutButton class="mt-11" />
  </div>
</template>

<script setup lang="ts">
import AppStoreLinks from '~/components/ui/AppStoreLinks.vue';
import LogoutButton from '~/components/ui/LogoutButton.vue';

import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();

const firstName = computed(
  () => authStore.loggedInUser?.profileInfo?.firstName || '',
);

const pageMessage = computed(
  () =>
    `Hello ${firstName.value}, you have no business on Oditor yet, Download the Oditor app to add your business.`,
);
</script>
