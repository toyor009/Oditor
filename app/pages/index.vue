<template>
  <MainDashboard />
</template>

<script setup lang="ts">
import MainDashboard from "~/components/main-dashboard/index.vue";

defineOptions({ name: "MainDashboard" });
definePageMeta({
  layout: "app",
  pageId: "home",
  pageTitle: "Dashboard",
});
</script>
