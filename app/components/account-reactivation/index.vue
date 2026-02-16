<template>
  <div>
    <Transition name="fade" mode="out-in" appear>
      <OTPForm
        v-if="otpSent"
        :user-email="auth.loggedInUser?.profileInfo?.email || ''"
        :is-submitting="isLoading"
        @resend-otp="resendOtp"
        @verify-otp="reactivateAccount"
      />

      <ReactivationForm v-else :is-loading="isLoading" @send-otp="sendOtp" />
    </Transition>

    <div class="mt-3">
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
const toast = useToast();

const otpSent = ref(false);
const isLoading = ref(false);

async function sendOtp() {
  try {
    isLoading.value = true;
    const { data, error } = await auth.sendOtp();

    if (error.value) {
      toast.add({
        title: 'Error',
        description: error.value?.data?.message || 'Unable to send OTP',
        color: 'error',
      });
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

    const accountActivationKey = localStorage.getItem('otpKey') || '';
    const { data, error } = await auth.reactivateAccount({
      accountActivationKey,
      accountActivationOtp,
    });

    if (error.value) {
      toast.add({
        title: 'Error',
        description:
          error.value?.data?.message || 'Account reactivation failed',
        color: 'error',
      });
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

function handleRedirection() {
  const businessProfiles =
    auth.loggedInUser?.profileInfo?.businessProfiles || [];

  if (businessProfiles?.length === 1) {
    navigateTo('/', { replace: true });
    return;
  }

  if (businessProfiles?.length > 1) {
    navigateTo('/choose-business', { replace: true });
    return;
  }
}
</script>
