<template>
  <BusinessSelectionPage />
</template>

<script setup lang="ts">
import BusinessSelectionPage from '~/components/business-selection/index.vue';

defineOptions({ name: 'BusinessSelectionPage' });

definePageMeta({
  layout: 'guest',
  pageTitle: 'Choose Business',
  // middleware: [''],
});
</script>
