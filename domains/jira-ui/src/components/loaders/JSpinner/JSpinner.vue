<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JSpinner',
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="j-spinner">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715"
      class="j-spinner-svg"
    >
      <circle
        fill="transparent"
        cx="45.714285714285715"
        cy="45.714285714285715"
        r="20"
        stroke-width="5.714285714285714"
        stroke-dasharray="125.664"
        stroke-dashoffset="125.66370614359172px"
        class="j-spinner-circle"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.j-spinner {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  overflow: hidden;
  vertical-align: middle;
}

.j-spinner-svg {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  animation: spinner-circular 1.4s ease-in-out infinite;
  transition: all 0.2s ease-in-out;
}

.j-spinner-circle {
  animation: spinner-circular 1.4s ease-in-out infinite;
  stroke-linecap: round;
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0px;
  stroke: currentColor;
  transition: all 0.6s ease-in-out;
}

@keyframes spinner-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100, 200;
    stroke-dashoffset: -15px;
  }
  to {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: -125px;
  }
}
</style>
