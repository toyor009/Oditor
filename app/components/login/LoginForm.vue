<template>
  <UForm
    class="w-full space-y-5 text-sm text-soft"
    :schema="schema"
    :state="{ ...loginDetails }"
    :disabled="isLoading"
    @submit.prevent="submitForm"
  >
    <!-- Email -->
    <UFormField
      label="Email"
      name="email"
      :ui="{ label: ' text-black mb-2.5' }"
    >
      <UInput
        v-model="loginDetails.email"
        class="w-full"
        variant="subtle"
        size="xl"
        placeholder="mail@website.com"
      />
    </UFormField>

    <!-- Password -->
    <UFormField
      label="Password"
      name="password"
      :ui="{ label: 'text-black mb-2.5' }"
    >
      <UInput
        v-model="loginDetails.password"
        class="w-full"
        variant="subtle"
        size="xl"
        placeholder="Min. 4 character"
        :type="showPassword ? 'text' : 'password'"
      >
        <template v-if="loginDetails.password.length" #trailing>
          <UButton
            variant="ghost"
            size="sm"
            class="text-soft"
            aria-controls="password"
            :icon="showPassword ? 'i-lucide-eye' : 'i-custom-eye-close'"
            :title="showPassword ? 'Hide password' : 'Show password'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          />
        </template>
      </UInput>

      <!-- Forgot Password Link -->
      <UButton variant="link" class="mt-2.5 text-xs text-primary float-end">
        Forgot Password?
      </UButton>
    </UFormField>

    <UButton
      label="Sign in"
      class="mt-10"
      type="submit"
      :loading="isLoading"
      block
    />
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot';

import type { FormSubmitEvent } from '@nuxt/ui';

import { useAuthStore } from '~/stores/useAuthStore';
import { useAuthUserRedirection } from '~/composables/useAuthUserRedirection';

defineOptions({ name: 'LoginForm' });

type Schema = v.InferOutput<ReturnType<typeof createSchema>>;

const authStore = useAuthStore();
const toast = useToast();
const { handleRedirection } = useAuthUserRedirection();

const schema = ref(createSchema());
const showPassword = ref(false);
const isLoading = ref(false);
const loginDetails = reactive({
  email: '',
  password: '',
});

const formIsValid = computed(() => {
  return v.safeParse(schema.value, loginDetails).success;
});

function createSchema() {
  return v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty('Email is required'),
      v.email('Invalid email address'),
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty('Password is required'),
      v.minLength(4, 'Minimum of 4 characters required'),
    ),
  });
}

async function submitForm(event: FormSubmitEvent<Schema>) {
  if (event.type !== 'submit') return;
  if (!formIsValid.value) return;

  login();
}

async function login() {
  try {
    isLoading.value = true;
    const { data, error } = await authStore.login(loginDetails);

    if (error.value) {
      toast.add({
        title: 'Log in failed',
        description: error.value?.data?.message || 'Log in failed',
        color: 'error',
      });
      return;
    }

    if (!data.value) return;

    toast.add({
      title: 'Success',
      description: 'Log in successful',
      color: 'success',
    });

    handleRedirection();
  } catch (error) {
    console.log('Error logging in', error);
  } finally {
    isLoading.value = false;
  }
}
</script>
