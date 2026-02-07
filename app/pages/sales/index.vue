<template>
  <SalesPage />
</template>

<script setup lang="ts">
import SalesPage from "~/components/sales/index.vue";

defineOptions({ name: "SalesPage" });
definePageMeta({
  layout: "app",
  pageId: "sales",
  pageTitle: "Sales",
});
</script>
