<template>
  <div>
    <div>
      <p class="mb-1 text-strong font-medium">
        {{ heading }}
      </p>
      <div class="mb-8">
        <p
          v-for="(message, index) in messages"
          :key="index"
          class="text-soft text-sm"
        >
          {{ message }}
        </p>
      </div>

      <!-- List of Businesses -->
      <BusinessList />

      <!-- Log out -->
      <LogoutButton class="mt-11" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BusinessList from '~/components/business-selection/BusinessList.vue';
import LogoutButton from '~/components/ui/LogoutButton.vue';

import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();

const route = useRoute();

const isReactivatedAccount = computed(
  () => route.redirectedFrom?.path === '/auth/reactivate-account',
);

const heading = computed(() => {
  if (isReactivatedAccount.value) return 'You’re good to go!';

  return `Hello, ${authStore.loggedInUser?.profileInfo?.firstName}`;
});

const messages = computed(() => {
  const messages = [`Select the business you’d like to continue with.`];
  if (isReactivatedAccount.value) {
    messages.unshift('Your account has been reactivated successfully.');
  }

  return messages;
});
</script>
