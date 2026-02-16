<template>
  <UForm
    class="w-full space-y-5 text-sm text-soft"
    :schema="schema"
    :state="{ ...formState }"
    :disabled="false"
    @submit.prevent="submitForm"
  >
    <!-- Email -->
    <UFormField
      label="Email"
      name="email"
      :ui="{ label: ' text-black mb-2.5' }"
    >
      <UInput
        v-model="formState.email"
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
        v-model="formState.password"
        class="w-full"
        variant="subtle"
        size="xl"
        placeholder="Min. 4 character"
        :type="showPassword ? 'text' : 'password'"
      >
        <template v-if="formState.password.length" #trailing>
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

    <UButton label="Sign in" class="mt-10" type="submit" block />
  </UForm>
</template>

<script setup lang="ts">
import * as v from 'valibot';

import type { FormSubmitEvent } from '@nuxt/ui';

import { useAuthStore } from '~/stores/useAuthStore';

defineOptions({ name: 'LoginForm' });

type Schema = v.InferOutput<ReturnType<typeof createSchema>>;

const auth = useAuthStore();

const schema = ref(createSchema());
const showPassword = ref(false);
const formState = reactive({
  email: '',
  password: '',
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

  console.log('submit form', formState);
}

async function login() {
  const { data } = await auth.login({ email: 'test@mail.com', password: '' });

  if (data.success) navigateTo('/', { replace: true });
}
</script>
