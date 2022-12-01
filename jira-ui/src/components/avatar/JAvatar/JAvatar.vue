<script lang="ts">
import { defineProps } from 'vue';

export default {
  name: 'JAvatar',
};
</script>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'xs',
    validator(value) {
      return ['xs', 'full'].includes(value);
    },
  },
  rounded: {
    type: String,
    default: 'full',
  },
});
</script>

<template>
  <div
    class="j-avatar"
    :class="[size, `rounded-${rounded}`]"
  >
    <div
      class="avatar-content"
      :class="[`rounded-${rounded}`]"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.j-avatar {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar-content {
    display: flex;
    overflow: hidden;
  }

  &.xs {
    width: 32px;
    height: 32px;

    .avatar-content {
      width: 24px;
      height: 24px;
    }
  }

  &.full {
    width: 32px;
    height: 32px;
  }
}
</style>
