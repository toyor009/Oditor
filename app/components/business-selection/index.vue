<template>
  <div>
    <div>
      <p class="mb-1 text-strong font-medium">{{ heading }}</p>
      <div class="mb-8">
        <p
          v-for="(message, index) in messages"
          :key="index"
          class="text-soft text-sm"
        >
          {{ message }}
        </p>
      </div>

      <!-- Business List -->
      <ul class="py-4 px-3 border border-neutral-200 rounded-2xl">
        <p class="mb-3 px-3 text-sm text-soft font-medium">My businesses</p>

        <ul class="space-y-3 divide-y divide-neutral-200">
          <li
            v-for="business in authStore.userBusinesses"
            class="not-last-of-type:pb-3"
          >
            <BusinessListItem
              :key="business.businessName"
              :business="business"
              :is-active="activeBusinessKey === business.businessKey"
              @select-business="activeBusinessKey = business.businessKey"
            />
          </li>
        </ul>
      </ul>

      <!-- Log out -->
      <LogoutButton class="mt-11" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BusinessListItem from '~/components/business-selection/BusinessListItem.vue';
import LogoutButton from '~/components/ui/LogoutButton.vue';

import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();
const route = useRoute();

const activeBusinessKey = ref(
  authStore.loggedInUser?.profileInfo?.currentBusinessKey || '',
);

const isReactivatedAccount = computed(
  () => route.redirectedFrom?.path === '/auth/choose-business',
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
