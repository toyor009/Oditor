<template>
  <div>
    <Transition name="fade" mode="out-in" appear>
      <OTPForm
        v-if="otpSent"
        :user-email="auth.loggedInUser?.profileInfo?.email || ''"
        :is-submitting="isLoading"
        :error="activationError"
        @resend-otp="resendOtp"
        @verify-otp="reactivateAccount"
      />

      <ReactivationForm
        v-else
        :is-loading="isLoading"
        :error="otpError"
        @send-otp="sendOtp"
      />
    </Transition>

    <!-- Log out -->
    <LogoutButton class="mt-3" />
  </div>
</template>

<script setup lang="ts">
import ReactivationForm from '~/components/account-reactivation/ReactivationForm.vue';
import OTPForm from '~/components/account-reactivation/OTPForm.vue';
import LogoutButton from '~/components/ui/LogoutButton.vue';

import { useAuthStore } from '~/stores/useAuthStore';
import { authUserRedirection } from '~/composables/authUserRedirection';

const auth = useAuthStore();
const toast = useToast();

const { handleRedirection } = authUserRedirection();

const otpSent = ref(false);
const isLoading = ref(false);
const otpError = ref({
  title: '',
  description: '',
});
const activationError = ref('');

async function sendOtp() {
  try {
    isLoading.value = true;
    clearOtpError();

    const { data, error } = await auth.sendOtp();

    if (error.value) {
      setOtpError(
        error.value?.data?.message || 'Unable to send reactivation OTP',
      );
      return;
    }

    if (!data.value) return;

    toast.add({
      title: 'Success',
      description: 'OTP has been sent to your email',
      color: 'success',
    });

    otpSent.value = true;
  } catch (error) {
    console.log('Error sending OTP', error);
  } finally {
    isLoading.value = false;
  }
}

async function resendOtp(startTimer: () => void) {
  await sendOtp();
  startTimer();
}

async function reactivateAccount(accountActivationOtp: string) {
  try {
    isLoading.value = true;
    clearActivationError();

    const accountActivationKey = localStorage.getItem('otpKey') || '';
    const { data, error } = await auth.reactivateAccount({
      accountActivationKey,
      accountActivationOtp,
    });

    if (error.value && error.value?.data?.errorCode === 435) {
      setActivationError(
        error.value?.data?.message || 'Account reactivation failed',
      );
      return;
    }

    if (!data.value) return;

    toast.add({
      title: 'Success',
      description: 'Account reactivated successfully',
      color: 'success',
    });

    handleRedirection();
  } catch (error) {
    console.log('Error reactivating account', error);
  } finally {
    isLoading.value = false;
  }
}

function setOtpError(description: string) {
  otpError.value = {
    title: 'Error',
    description,
  };
}

function clearOtpError() {
  otpError.value = {
    title: '',
    description: '',
  };
}

function setActivationError(error: string) {
  activationError.value = error;
}

function clearActivationError() {
  activationError.value = '';
}
</script>
