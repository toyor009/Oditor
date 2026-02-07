<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import { useHead, useRoute, useSeoMeta } from "#imports";

import { capitalize } from "~/utils/misc";

const route = useRoute();

const props = defineProps<{
  pageId?: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
}>();

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
  title: `Oditor  | ${capitalize(props.pageTitle)}`,
  ogTitle: `Oditor  | ${props.seoTitle || capitalize(props.pageTitle) || ""}`,
  description: props.seoDescription || "",
  ogDescription: props.seoDescription || "",
  ogImage: props?.seoImage || "/images/logo-1.png",
  twitterCard: "summary_large_image",
});
</script>
