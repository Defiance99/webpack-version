<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JSkeleton',
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
  <div class="j-skeleton-loader" />
</template>

<style lang="scss" scoped>
.j-skeleton-loader {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  overflow: hidden;
  background: rgba(0, 0, 0, 0.12);
  border-radius: inherit;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.3),
      hsla(0, 0%, 100%, 0)
    );
    animation: loading 1.5s infinite;
    transform: translateX(-100%);
  }
}

@keyframes loading {
  to {
    transform: translateX(100%);
  }
}
</style>
