<template>
  <SettingsPage />
</template>

<script setup lang="ts">
import SettingsPage from "~/components/settings/index.vue";

defineOptions({ name: "SettingsPage" });
definePageMeta({
  layout: "app",
  pageId: "settings",
  pageTitle: "Settings",
  middleware: ["auth"],
});
</script>
