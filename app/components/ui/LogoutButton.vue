<template>
  <div>
    <UButton
      label="Logout"
      variant="ghost"
      color="error"
      block
      @click="authStore.logout()"
    >
      <template #leading>
        <LogoutIcon active-color="#FE393B" active />
      </template>
    </UButton>
  </div>
</template>

<script lang="ts" setup>
import LogoutIcon from '~/components/icons/Logout.vue';

import { useAuthStore } from '~/stores/useAuthStore';

const authStore = useAuthStore();
</script>
