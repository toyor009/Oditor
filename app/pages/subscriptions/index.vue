<template>
  <SubscriptionsPage />
</template>

<script setup lang="ts">
import SubscriptionsPage from "~/components/subscriptions/index.vue";

defineOptions({ name: "SubscriptionsPage" });
definePageMeta({
  layout: "app",
  pageId: "subscriptions",
  pageTitle: "Subscriptions",
});
</script>
