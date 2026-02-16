<template>
  <div>
    <Transition name="fade" mode="out-in" appear>
      <OTPForm v-if="otpSent" @resend-otp="resendOtp" />

      <ReactivationForm v-else @send-otp="sendOtp" />
    </Transition>

    <div class="mt-3 fle">
      <UButton
        label="Logout"
        variant="ghost"
        color="error"
        block
        @click="auth.logout()"
      >
        <template #leading>
          <LogoutIcon active-color="#FE393B" active />
        </template>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReactivationForm from '~/components/account-reactivation/ReactivationForm.vue';
import OTPForm from '~/components/account-reactivation/OTPForm.vue';
import LogoutIcon from '~/components/icons/Logout.vue';

import { useAuthStore } from '~/stores/useAuthStore';

const auth = useAuthStore();

const otpSent = ref(false);

function sendOtp() {
  otpSent.value = true;
}

function resendOtp(startTimer: () => void) {
  startTimer();
}
</script>
