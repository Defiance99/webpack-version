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
    validator(value: string): boolean {
      return ['xs', 's', 'full'].includes(value);
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
@import './variables.scss';

.j-avatar {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar-content {
    display: flex;
    overflow: hidden;
  }

  &.xs {
    width: map-get($j-avatar-size, wrapper, xs, width);
    height: map-get($j-avatar-size, wrapper, xs, height);

    .avatar-content {
      width: map-get($j-avatar-size, avatar, xs, width);
      height: map-get($j-avatar-size, avatar, xs, height);
    }
  }

  &.s {
    width: map-get($j-avatar-size, wrapper, s, width);
    height: map-get($j-avatar-size, wrapper, s, height);

    .avatar-content {
      width: map-get($j-avatar-size, avatar, s, width);
      height: map-get($j-avatar-size, avatar, s, height);
    }
  }

  &.full {
    width: 32px;
    height: 32px;
  }
}
</style>
