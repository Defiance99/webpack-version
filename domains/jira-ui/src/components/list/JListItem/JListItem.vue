<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JListItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div
    v-ripple="{ disabled }"
    v-bind="$attrs"
    tabindex="0"
    class="j-list-item"
    :class="{ active, disabled }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.j-list-item {
  display: flex;
  align-items: center;
  flex: 1 1 100%;
  position: relative;
  padding: 0 16px;
  min-height: 48px;
  letter-spacing: normal;
  outline: none;
  text-decoration: none;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  cursor: pointer;

  &.active {
    background-color: var(--j-primary-light-color);
  }

  &.disabled {
    cursor: not-allowed;
  }

  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      background-color: var(--j-primary-hover-color);
    }
  }
}
</style>
