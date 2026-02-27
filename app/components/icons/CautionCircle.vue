<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'CautionIcon' });

const props = defineProps({
  color: {
    type: String,
    default: '#FE393B',
  },
  active: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 17,
  },
  height: {
    type: Number,
    default: 17,
  },
});

const viewBox = computed(() => {
  const { height, width } = props;

  return `0 0 ${width} ${height}`;
});

const getFillColor = computed(() => {
  const { active, activeColor, color } = props;

  return active ? activeColor : color;
});
</script>

<template>
  <div>
    <svg
      :viewBox="viewBox"
      :width="width"
      :height="height"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.33333 0C12.9358 0 16.6667 3.73083 16.6667 8.33333C16.6667 12.9358 12.9358 16.6667 8.33333 16.6667C3.73083 16.6667 0 12.9358 0 8.33333C0 3.73083 3.73083 0 8.33333 0ZM8.33333 10.8333C8.11232 10.8333 7.90036 10.9211 7.74408 11.0774C7.5878 11.2337 7.5 11.4457 7.5 11.6667C7.5 11.8877 7.5878 12.0996 7.74408 12.2559C7.90036 12.4122 8.11232 12.5 8.33333 12.5C8.55435 12.5 8.76631 12.4122 8.92259 12.2559C9.07887 12.0996 9.16667 11.8877 9.16667 11.6667C9.16667 11.4457 9.07887 11.2337 8.92259 11.0774C8.76631 10.9211 8.55435 10.8333 8.33333 10.8333ZM8.33333 3.33333C8.12922 3.33336 7.93222 3.4083 7.77969 3.54393C7.62716 3.67956 7.52971 3.86646 7.50583 4.06917L7.5 4.16667V9.16667C7.50024 9.37907 7.58157 9.58336 7.72737 9.73781C7.87318 9.89225 8.07246 9.9852 8.2845 9.99764C8.49653 10.0101 8.70532 9.9411 8.86819 9.80478C9.03107 9.66845 9.13575 9.47508 9.16083 9.26417L9.16667 9.16667V4.16667C9.16667 3.94565 9.07887 3.73369 8.92259 3.57741C8.76631 3.42113 8.55435 3.33333 8.33333 3.33333Z"
        :fill="getFillColor"
      />
    </svg>
  </div>
</template>
