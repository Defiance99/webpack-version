<script lang="ts">
import { defineComponent, computed } from 'vue';

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
    type: {
      type: String,
      default: 'checkbox',
      validator: (value: string): boolean => ['checkbox', 'radio'].includes(value),
    },
  },
  setup(props) {
    const iconType = computed(() => {
      if (props.type === 'checkbox') {
        return {
          icon: `${props.active ? 'activeCheckbox' : 'checkbox'}`,
        };
      }

      return {
        icon: `${props.active ? 'activeRadio' : 'radio'}`,
      };
    });

    return {
      iconType,
    };
  },
});
</script>

<template>
  <JIcon
    v-bind="iconType"
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
