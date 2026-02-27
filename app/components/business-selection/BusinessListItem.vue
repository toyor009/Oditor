<template>
  <div
    class="p-3 rounded-lg flex gap-1"
    :class="
      isLoading
        ? 'cursor-not-allowed'
        : isActive
          ? 'bg-neutral-100'
          : 'hover:bg-neutral-100 cursor-pointer'
    "
    :title="isLoading ? '' : isActive ? '' : 'Click to select this business'"
    @click="!isLoading && emit('change-business', business)"
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
      :loading="isLoading"
      @click="emit('choose-business', business)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UserBusiness } from '~/types/business';

defineProps<{
  business: UserBusiness;
  isActive?: boolean;
  isLoading?: boolean;
}>();

const emit = defineEmits<{
  (event: 'change-business', business: UserBusiness): void;
  (event: 'choose-business', business: UserBusiness): void;
}>();
</script>
