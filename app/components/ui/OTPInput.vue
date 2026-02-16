<template>
  <div>
    <!-- OTP Input -->
    <div>
      <UPinInput
        v-model="otp"
        type="number"
        class="w-full"
        :length="4"
        :autofocus="true"
        :otp="true"
        :disabled="isLoading"
        :ui="{
          base: 'w-full md:w-17 h-12 bg-neutral-100 text-2xl ring-grey-300 rounded-xl',
          root: 'justify-between',
        }"
      />
    </div>

    <!-- Resend OTP -->
    <div class="mt-6 flex items-center text-sm text-soft font-medium">
      Didn’t receive it?

      <UButton
        variant="link"
        class="ml-3 p-0"
        size="sm"
        :disabled="isCountingDown"
        @click="resendOtp"
      >
        <span v-if="isCountingDown" class="text-soft font-medium">
          Resend in {{ moment.utc(remainingTime * 1000).format('mm:ss') }}
        </span>
        <span v-else class="text-soft font-medium underline">
          Click here to resend
        </span>
      </UButton>
    </div>

    <!-- Verify OTP -->
    <UButton
      label="Verify"
      class="mt-12"
      :loading="isLoading"
      :disabled="isLoading || !formIsValid"
      block
      @click="emit('submit', otp.join(''))"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

defineOptions({ name: 'OTPInput' });

const props = withDefaults(
  defineProps<{
    isLoading?: boolean;
    duration?: number;
  }>(),
  {
    duration: 60,
  },
);

const emit = defineEmits<{
  (e: 'submit', otp: string): void;
  (e: 'resend-otp', startTimer: () => void): void;
}>();

const remainingTime = ref<number>(0);
let timerId: number | null = null;
const otp = ref([]);

const isCountingDown = computed(() => remainingTime.value > 0);

const formIsValid = computed(() => {
  const optValue = otp.value.join('');
  return optValue.length === 4;
});

function saveEndTime(endTimestamp: number) {
  localStorage.setItem('otpEndTime', endTimestamp.toString());
}

function removeEndTime() {
  localStorage.removeItem('otpEndTime');
}

function getSavedEndTime(): number | null {
  const saved = localStorage.getItem('otpEndTime');
  return saved ? parseInt(saved) : null;
}

function startTimer() {
  const endTimestamp = Date.now() + props.duration * 1000;
  // saveEndTime(endTimestamp);
  runCountdown(endTimestamp);
}

function runCountdown(endTimestamp: number) {
  if (timerId) clearInterval(timerId);

  updateRemainingTime(endTimestamp);

  timerId = window.setInterval(() => {
    updateRemainingTime(endTimestamp);
    if (remainingTime.value <= 0 && timerId) {
      clearInterval(timerId);
      timerId = null;
      removeEndTime(); // clear saved time
    }
  }, 1000);
}

function updateRemainingTime(endTimestamp: number) {
  const diff = Math.floor((endTimestamp - Date.now()) / 1000);
  remainingTime.value = diff > 0 ? diff : 0;
}

const resendOtp = async () => {
  emit('resend-otp', startTimer);
};

onMounted(async () => {
  // On component mount, check if there's a saved end time
  const savedEnd = getSavedEndTime();
  if (savedEnd && savedEnd > Date.now()) {
    return runCountdown(savedEnd);
  }
  startTimer();
});

// Clean up on unmount
onUnmounted(() => {
  removeEndTime();

  if (timerId) {
    clearInterval(timerId);
  }
});
</script>

<style></style>
