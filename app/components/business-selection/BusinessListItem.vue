<template>
  <div
    class="p-3 rounded-lg hover:bg-neutral-100 hover:cursor-pointer flex gap-1"
    :class="isActive ? 'bg-neutral-100' : ''"
    :title="isActive ? '' : 'Click to select this business'"
    @click="emit('select-business', business)"
  >
    <div class="flex-1 space-y-1 text-sm">
      <p
        class="text-strong font-medium line-clamp-1 text-ellipsis"
        :title="business.businessName"
      >
        {{ business.businessName }}
      </p>
      <p class="text-soft">{{ business.businessAddress }}</p>
    </div>

    <UButton
      v-if="isActive"
      label="Proceed"
      variant="link"
      size="sm"
      class="h-fit p-0"
      trailing-icon="i-lucide-chevron-right"
      title="Log into this business"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserBusiness } from '~/types/auth';

defineProps<{
  business: UserBusiness;
  isActive?: boolean;
}>();

const emit = defineEmits<{
  (event: 'select-business', business: UserBusiness): void;
}>();
</script>
