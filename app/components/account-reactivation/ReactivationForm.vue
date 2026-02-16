<template>
  <div>
    <p class="mb-1 text-strong font-medium">Reactivate Account</p>
    <p class="mb-6 text-soft text-sm">
      Oops, Sorry your account was deactivated, would you like to reactivate
      your account?
    </p>

    <UButton label="Reactivate" block @click="emit('send-otp')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['send-otp']);
</script>
