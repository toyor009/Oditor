<template>
  <!-- :style="containerStyle" -->
  <Transition name="fade" mode="out-in" appear>
    <div
      v-if="title || description"
      class="bg-error-50 p-3 rounded-lg flex gap-2"
      :class="[bgColor, theme === 'plain' ? 'items-center' : 'items-start']"
    >
      <slot name="icon">
        <CautionIcon />
      </slot>

      <div class="text-error space-y-1">
        <p v-if="theme === 'error' && title" class="text-sm font-medium">
          {{ title }}
        </p>

        <p
          v-if="description"
          :class="theme === 'plain' ? 'text-sm' : 'text-xs'"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';

import CautionIcon from '~/components/icons/CautionCircle.vue';

defineOptions({ name: 'ErrorBlock' });

const props = defineProps<{
  title?: string;
  description?: string;
  theme: 'error' | 'plain';
}>();

const bgColor = computed(() => {
  const bgColors = { error: 'bg-error-50', plain: 'bg-white' };
  return bgColors[props.theme];
});

const containerStyle = computed((): StyleValue => {
  const { title, description } = props;
  return { visibility: title || description ? 'visible' : 'hidden' };
});
</script>
