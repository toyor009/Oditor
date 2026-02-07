<template>
  <ProductsPage />
</template>

<script setup lang="ts">
import ProductsPage from "~/components/products/index.vue";

defineOptions({ name: "ProductsPage" });
definePageMeta({
  layout: "app",
  pageId: "products",
  pageTitle: "Products",
});
</script>
