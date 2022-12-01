<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div :title="props.title" class="w-button">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.w-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: 150ms;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;

  &:hover,
  &.active {
    background: rgba(9, 30, 66, 0.08);
  }

  :deep(svg) {
    display: flex;
    width: 16px;
    height: 16px;
  }
}
</style>
