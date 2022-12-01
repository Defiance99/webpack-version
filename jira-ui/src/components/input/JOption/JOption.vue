<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JOption',
  props: {
    value: {
      type: [Number, String, Object],
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <JIcon
    :icon="active ? 'activeCheckbox' : 'checkbox'"
    class="checkbox-icon"
    :class="{ active }"
  />

  <slot />
</template>

<style lang="scss" scoped>
@import './variables.scss';

.checkbox-icon {
  margin-right: map-get($j-option, margin-right);
  width: map-get($j-option, width);
  height: map-get($j-option, height);
  min-width: map-get($j-option, width);
  min-height: map-get($j-option, height);
  fill: map-get($j-option, fill);

  &.active {
    fill: var(--j-primary-color);
  }

  &:active {
    background-color: var(--j-primary-light-color);
  }
}
</style>
