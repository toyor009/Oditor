<template>
  <div>
    <p class="mb-1 text-strong font-medium">{{ title }}</p>
    <p class="mb-5 text-soft text-sm">{{ description }}</p>

    <div class="flex gap-3">
      <a
        href="https://apps.apple.com/ng/app/oditor/id6664065457"
        target="_blank"
      >
        <NuxtImg
          src="/images/app-store-logo.png"
          class="w-48.5"
          alt="App store"
        />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.theoditor.mobile"
        target="_blank"
      >
        <NuxtImg
          src="/images/play-store-logo.png"
          class="w-48.5"
          alt="Play store"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppStoreLinks' });

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: `Don’t have an Oditor Account`,
    description: 'Download the Oditor mobile app to sign up',
  },
);
</script>
