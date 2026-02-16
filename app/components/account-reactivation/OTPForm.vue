<template>
  <div>
    <p class="mb-1 text-strong font-medium">Verify your email</p>
    <p class="mb-6 text-soft text-sm">
      <!-- TODO: Add user's email -->
      An OTP has been sent to ot******@gmail.com
    </p>

    <OTPInput :duration="180" @resend-otp="emit('resend-otp', $event)" />
  </div>
</template>

<script setup lang="ts">
import OTPInput from '~/components/ui/OTPInput.vue';

const emit = defineEmits<{
  (e: 'resend-otp', startTimer: () => void): void;
}>();
</script>
