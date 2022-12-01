<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

const sizes: { [key: string]: string } = {
  custom: 'size-custom',
  m: 'text-subtitle-3 size-m',
  s: 'text-subtitle-5 size-s',
  xs: 'text-body-4 size-xs',
  xxs: 'text-body-4 size-xxs',
};

export default defineComponent({
  name: 'JButton',
  props: {
    size: {
      type: String,
      default: 'xxs',
      validator: (value: string): boolean => ['custom', 'm', 's', 'xs', 'xxs'].includes(value),
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value: string): boolean => ['primary', 'normal', 'stroked'].includes(value),
    },
  },
  setup(props) {
    const btnSize = computed((): string => sizes[props.size]);

    const uiButtonRef = ref<HTMLElement | null>(null);

    return { btnSize, uiButtonRef };
  },
});
</script>

<template>
  <button
    ref="uiButtonRef"
    v-ripple
    :bind="{ ...$attrs }"
    class="j-button"
    :class="[btnSize, type]"
  >
    <span class="j-button-bg" />
    <span class="j-button-label">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
@import "./_variables.scss";

.j-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  border: unset;
  transition: background 200ms, border 200ms;
}

.j-button.size-xxs {
  padding: map-get($btn-paddings, "xxs");
  height: map-get($btn-heights, "xxs");
}

.j-button.size-xs {
  padding: map-get($btn-paddings, "xs");
  height: map-get($btn-heights, "xs");
}

.j-button.size-s {
  padding: map-get($btn-paddings, "s");
  height: map-get($btn-heights, "s");
}

.j-button.size-m {
  padding: map-get($btn-paddings, "m");
  height: map-get($btn-heights, "m");
}

.j-button.size-custom {
  height: map-get($btn-heights, "m");
}

.j-button-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  border-radius: inherit;
}

.j-button {
  position: relative;
  font-weight: 500;
  box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f;

  &.primary {
    &:hover {
      .j-button-bg {
        opacity: 0.8;
      }
    }

    .j-button-label {
      color: var(--j-primary-text-color);
      z-index: 0;
    }

    .j-button-bg {
      background-color: var(--j-primary-color);
    }
  }

  &.normal {
    color: var(--j-text);
    background-color: var(--j-primary-text-color);

    &:hover {
      .j-button-bg {
        background-color: var(--j-primary-active-color);
        opacity: 0.2;
      }
    }
  }

  &.stroked {
    border: 1px var(--j-primary-text-color) solid;

    &:hover {
      .j-button-bg {
        opacity: 0.9;
      }
    }

    .j-button-label {
      color: var(--j-primary-text-color);
      z-index: 0;
    }

    .j-button-bg {
      background-color: var(--j-primary-color);
    }
  }
}
</style>
