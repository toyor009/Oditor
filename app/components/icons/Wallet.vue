<script setup lang="ts">
import { computed } from "vue";

defineOptions({ name: "WalletIcon" });

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
  width: {
    type: Number,
    default: 15,
  },
  height: {
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
        d="M13.3333 2.08354V2.92604C13.7754 2.92604 14.1993 3.10163 14.5118 3.41419C14.8244 3.72675 15 4.15068 15 4.59271V12.926C15 13.3681 14.8244 13.792 14.5118 14.1045C14.1993 14.4171 13.7754 14.5927 13.3333 14.5927H1.66667C1.22464 14.5927 0.800716 14.4171 0.488155 14.1045C0.175595 13.792 0 13.3681 0 12.926V4.59271C0 3.72187 0.695834 2.93187 1.51083 2.69937L10.6775 0.0802055C10.9876 -0.00841541 11.314 -0.0238409 11.631 0.0351436C11.9481 0.094128 12.2471 0.225912 12.5046 0.420117C12.762 0.614323 12.9709 0.865647 13.1147 1.1543C13.2585 1.44295 13.3334 1.76105 13.3333 2.08354ZM10.4167 7.50937C10.0851 7.50937 9.7672 7.64107 9.53278 7.87549C9.29836 8.10991 9.16667 8.42785 9.16667 8.75937C9.16667 9.09089 9.29836 9.40884 9.53278 9.64326C9.7672 9.87768 10.0851 10.0094 10.4167 10.0094C10.7482 10.0094 11.0661 9.87768 11.3005 9.64326C11.535 9.40884 11.6667 9.09089 11.6667 8.75937C11.6667 8.42785 11.535 8.10991 11.3005 7.87549C11.0661 7.64107 10.7482 7.50937 10.4167 7.50937ZM11.6667 2.08354C11.6667 2.02472 11.6543 1.96655 11.6302 1.91287C11.6062 1.85919 11.5711 1.81121 11.5271 1.77208C11.4832 1.73296 11.4315 1.70358 11.3754 1.68588C11.3193 1.66817 11.2601 1.66255 11.2017 1.66937L11.135 1.68271L6.78333 2.92604H11.6667V2.08354Z"
        :fill="getFillColor"
      />
    </svg>
  </div>
</template>
<style lang="scss" scoped></style>
