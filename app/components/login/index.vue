<template>
  <div>
    <p class="text-xl text-black font-medium font-gilmer">Welcome Again!</p>

    <p class="mt-2 mb-6 text-soft text-sm">
      Track sales, monitor growth, spot fast-selling products, and manage your
      inventory with ease.
    </p>

    <LoginForm />

    <div class="my-10 flex gap-3 items-center">
      <span class="text-soft text-[10px] text-nowrap"> NO ACCOUNT? </span>
      <hr class="w-full border-soft" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/login/LoginForm.vue';
</script>
