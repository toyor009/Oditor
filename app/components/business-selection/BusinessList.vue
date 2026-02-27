<template>
  <!-- Error Message-->
  <ErrorBlock v-bind="error" class="mb-3" theme="error" />

  <!-- Business List -->
  <div class="py-4 px-3 border border-neutral-200 rounded-2xl">
    <p class="mb-3 px-3 text-sm text-soft font-medium">My businesses</p>

    <ul class="space-y-3 divide-y divide-neutral-200">
      <li
        v-for="business in businessStore.userBusinesses"
        class="not-last-of-type:pb-3"
      >
        <BusinessListItem
          :key="business.businessName"
          :business="business"
          :is-active="activeBusinessKey === business.businessKey"
          :is-loading="isLoading"
          @change-business="activeBusinessKey = business.businessKey"
          @choose-business="loginToBusiness(business.businessKey)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BusinessListItem from '~/components/business-selection/BusinessListItem.vue';
import ErrorBlock from '~/components/ui/ErrorBlock.vue';

import { useBusinessStore } from '~/stores/useBusinessStore';

const businessStore = useBusinessStore();

const activeBusinessKey = ref(businessStore?.currentBusinessKey || '');
const isLoading = ref(false);
const error = ref({
  title: '',
  description: '',
});

async function loginToBusiness(businessKey: string) {
  try {
    isLoading.value = true;
    clearError();

    const { data, error } = await businessStore.swtichBusiness(businessKey);

    if (error.value) {
      setError(error.value?.data?.message || 'Business switch failed');
      return;
    }

    if (!data.value) return;

    return navigateTo('/', { replace: true });
  } catch (error) {
    console.log('Error loggig in to business', error);
  } finally {
    isLoading.value = false;
  }
}

function setError(description: string) {
  error.value = {
    title: 'Error',
    description,
  };
}

function clearError() {
  error.value = {
    title: '',
    description: '',
  };
}
</script>
