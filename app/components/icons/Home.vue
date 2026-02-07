<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "HomeIcon" });

const props = defineProps({
  color: {
    type: String,
    default: "#A3A3A3",
  },
  active: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: "",
  },
  height: {
    type: Number,
    default: 16,
  },
  width: {
    type: Number,
    default: 15,
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
        d="M6.5 0.333333C6.78849 0.116963 7.13938 0 7.5 0C7.86062 0 8.21151 0.116963 8.5 0.333333L14.3333 4.70833C14.5403 4.86358 14.7083 5.06488 14.824 5.29631C14.9398 5.52774 15 5.78292 15 6.04167V13.9583C15 14.4004 14.8244 14.8243 14.5118 15.1368C14.1993 15.4494 13.7754 15.625 13.3333 15.625H1.66667C1.22464 15.625 0.800716 15.4494 0.488155 15.1368C0.175595 14.8243 0 14.4004 0 13.9583V6.04167C0 5.78292 0.0602418 5.52774 0.175955 5.29631C0.291668 5.06488 0.459673 4.86358 0.666667 4.70833L6.5 0.333333Z"
        :fill="getFillColor"
      />
    </svg>
  </div>
</template>
<style lang="scss" scoped></style>
