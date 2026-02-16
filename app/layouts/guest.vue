<template>
  <div class="h-dvh overflow-auto">
    <div class="h-full min-w-5xl overflow-x-scroll grid grid-cols-2">
      <div class="w-100 mt-25 mx-auto">
        <slot />
      </div>

      <div
        class="bg-grey-25 p-4 border-l border-[#f2f2f2] flex items-center xl:items-end"
      >
        <NuxtImg src="/images/image-1.png" class="w-full xl:w-166 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo';
import { useHead, useRoute, useSeoMeta } from '#imports';

import { capitalize } from '~/utils/misc';

const route = useRoute();

const pageTitle = computed(
  () => (route.meta.pageTitle as string | undefined) ?? '',
);
const seoTitle = computed(() => route.meta.seoTitle as string | undefined);
const seoDescription = computed(
  () => (route.meta.seoDescription as string | undefined) ?? '',
);
const seoImage = computed(() => route.meta.seoImage as string | undefined);

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: '#007AFF' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/images/favicon.png' },
    {
      rel: 'canonical',
      href: `https://app.theoditor.com/${withoutTrailingSlash(route.path)}`,
    },
  ],
  htmlAttrs: {
    class: 'h-full bg-white',
    lang: 'en',
  },
  bodyAttrs: {
    class: 'h-full',
  },
});

useSeoMeta({
  title: computed(() => `Oditor  | ${capitalize(String(pageTitle.value))}`),
  ogTitle: computed(
    () => `Oditor  | ${seoTitle.value || capitalize(pageTitle.value) || ''}`,
  ),
  description: computed(() => seoDescription.value),
  ogDescription: computed(() => seoDescription.value),
  ogImage: computed(() => seoImage.value || '/images/logo-1.png'),
  twitterCard: 'summary_large_image',
});
</script>
