<template>
  <div>
    <p class="mb-1 text-strong font-medium">Verify your email</p>
    <p class="mb-6 text-soft text-sm">
      An OTP has been sent to {{ formattedEmail }}
    </p>

    <OTPInput
      :duration="180"
      :is-submitting="isSubmitting"
      :error="error"
      @resend-otp="emit('resend-otp', $event)"
      @submit="emit('verify-otp', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import OTPInput from '~/components/ui/OTPInput.vue';

const props = defineProps<{
  userEmail: string;
  isSubmitting?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'resend-otp', startTimer: () => void): void;
  (e: 'verify-otp', otp: string): void;
}>();

const formattedEmail = computed(() => {
  const { userEmail } = props;
  if (!userEmail) return '';
  const [name, domain] = userEmail.split('@');
  if (!name || !domain) return userEmail;
  // Mask: first char, 3 stars, then rest (if enough chars)
  const visible = name.length > 1 ? name[0] : '';
  const masked = name.length > 1 ? '***' : '';
  return `${visible}${masked}@${domain}`;
});
</script>
