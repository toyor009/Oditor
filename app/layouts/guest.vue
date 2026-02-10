<template>
  <div class="h-dvh flex flex-col flex-1 p-4">
    <!-- TODO: Build out the actual guest layout -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import { useHead, useRoute, useSeoMeta } from "#imports";

import { capitalize } from "~/utils/misc";

const route = useRoute();

const pageTitle = computed(
  () => (route.meta.pageTitle as string | undefined) ?? "",
);
const seoTitle = computed(() => route.meta.seoTitle as string | undefined);
const seoDescription = computed(
  () => (route.meta.seoDescription as string | undefined) ?? "",
);
const seoImage = computed(() => route.meta.seoImage as string | undefined);

useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: "#007AFF" },
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/images/favicon.png" },
    {
      rel: "canonical",
      href: `https://app.theoditor.com/${withoutTrailingSlash(route.path)}`,
    },
  ],
  htmlAttrs: {
    class: "h-full bg-white",
    lang: "en",
  },
  bodyAttrs: {
    class: "h-full",
  },
});

useSeoMeta({
  title: computed(() => `Oditor  | ${capitalize(String(pageTitle.value))}`),
  ogTitle: computed(
    () => `Oditor  | ${seoTitle.value || capitalize(pageTitle.value) || ""}`,
  ),
  description: computed(() => seoDescription.value),
  ogDescription: computed(() => seoDescription.value),
  ogImage: computed(() => seoImage.value || "/images/logo-1.png"),
  twitterCard: "summary_large_image",
});
</script>
