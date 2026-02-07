<template>
  <CustomersPage />
</template>

<script setup lang="ts">
import CustomersPage from "~/components/customers/index.vue";

defineOptions({ name: "CustomersPage" });
definePageMeta({
  layout: "app",
  pageId: "customers",
  pageTitle: "Customers",
});
</script>
