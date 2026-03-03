<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <Sidebar :page-id="pageId || ''" />

    <div class="main-content">
      <!-- Navbar -->
      <!-- <Navbar /> -->

      <main class="main-scrollable max-w-360 mx-auto">
        <div class="flex flex-col flex-1 py-4 px-8">
          <!-- Page Content -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import { useHead, useRoute, useSeoMeta } from "#imports";

import Sidebar from "~/components/ui/Sidebar.vue";

import { capitalize } from "~/utils/misc";

import type { AppRouteId } from "~/types/generic";

const route = useRoute();

const pageId = computed(
  () => (route.meta.pageId as AppRouteId | undefined) ?? ("" as AppRouteId),
);

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

<style scoped>
.app-layout {
  display: flex;
  height: 100dvh;
  overflow: hidden;
  background-color: #fafafa;

  @media screen and (width <= 1024px) {
    overflow-x: auto;
    overflow-y: hidden;
  }
}

.main-content {
  display: flex;
  flex: 1;
  height: 100dvh;
  overflow: hidden;
}

.main-scrollable {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
