<template>
  <NoBusinessPage />
</template>

<script setup lang="ts">
import NoBusinessPage from '~/components/business-selection/NoBusiness.vue';

defineOptions({ name: 'NoBusinessPage' });

definePageMeta({
  layout: 'guest',
  pageTitle: 'No Business',
  middleware: ['no-business'],
});
</script>
