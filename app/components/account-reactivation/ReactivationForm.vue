<template>
  <div>
    <p class="mb-1 text-strong font-medium">Reactivate Account</p>
    <p class="mb-6 text-soft text-sm">
      Oops, Sorry your account was deactivated, would you like to reactivate
      your account?
    </p>

    <ErrorBlock v-bind="error" class="mt-2 mb-6" theme="error" />

    <UButton
      label="Reactivate"
      :loading="isLoading"
      block
      @click="emit('send-otp')"
    />
  </div>
</template>

<script setup lang="ts">
import ErrorBlock from '~/components/ui/ErrorBlock.vue';

defineProps<{
  isLoading?: boolean;
  error: {
    title: string;
    description: string;
  };
}>();

const emit = defineEmits(['send-otp']);
</script>
