<script lang="ts">
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { computed, defineComponent, ref } from 'vue';

const inputEmitName = 'update:modelValue';
const resetEmitName = 'update:resetValue';

export default defineComponent({
  name: 'JTextField',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    closeIcon: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    regular: {
      type: Boolean,
      default: false,
    },
  },
  emits: [inputEmitName, resetEmitName],
  setup(props, { emit }) {
    const textFieldRef = ref<HTMLElement | null>(null);
    const isFocusInput = ref<boolean>(false);

    const textFieldValue = computed({
      set(value: string): void {
        emit(inputEmitName, value);
      },
      get() {
        return props.modelValue;
      },
    });

    const onInputClick = (): void => {
      textFieldRef.value?.focus();
    };

    const onBlurFocus = (): void => {
      textFieldRef.value?.blur();
    };

    const resetFieldValue = (): void => {
      textFieldValue.value = '';
      emit(resetEmitName);
    };

    const showUnderline = computed(() => props.outlined === false);

    return {
      onBlurFocus,
      onInputClick,
      isFocusInput,
      textFieldValue,
      textFieldRef,
      resetFieldValue,
      showUnderline,
    };
  },
});
</script>

<template>
  <div
    class="j-text-field-wrapper"
    :class="{ focused: isFocusInput, active: modelValue, input: showInput, outlined, dense, regular }"
    @click="onInputClick"
  >
    <div class="prepend">
      <slot name="prepend" />
    </div>

    <div class="j-text-field-control-wrapper">
      <input
        v-if="showInput"
        ref="textFieldRef"
        v-model="textFieldValue"
        v-bind="{ ...$attrs }"
        class="j-text-field"
        @focus="isFocusInput = true"
        @blur="isFocusInput = false"
        @keydown.esc="onBlurFocus"
      >
      <slot name="label" />
      <label class="j-text-field-label">
        {{ placeholder }}
      </label>
    </div>

    <div class="append">
      <slot name="append" />

      <div
        v-if="closeIcon"
        class="j-text-field-close-wrapper"
        @click="resetFieldValue"
      >
        <JIcon
          icon="close"
          container-size
        />
      </div>
    </div>

    <div
      v-if="showUnderline"
      class="j-text-field-underline"
    >
      <div class="j-text-field-ripple" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './variables.scss';

.j-text-field-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.4em 0.75em 0 0.75em;
  font-size: 14px;
  cursor: text;
  border-radius: 4px 4px 0 0;
  transition: 150ms;
  background-color: map-get($j-text-field, bg-color);

  &:hover {
    .j-text-field-ripple {
      opacity: 1;
    }
  }

  &.focused {
    border-color: var(--j-primary-color) !important;

    .j-text-field {
      caret-color: var(--j-primary-color);
    }

    .j-text-field-label {
      color: var(--j-primary-color);
      transform: translateY(-0.75em) scale(0.75);
    }

    .j-text-field-ripple {
      opacity: 1;
      background-color: var(--j-primary-color);
    }
  }

  &.active {
    .j-text-field-label {
      transform: translateY(-0.75em) scale(0.75);
    }
  }

  .prepend {
    padding-right: 7px;
  }

  .prepend,
  .append {
    display: flex;
    align-items: center;
  }

  &.outlined {
    border-radius: 4px;
    border: map-get($j-text-field, border);
    background-color: unset;

    &:hover:not(.regular):not(.focused) {
      background-color: map-get($j-text-field, outlined-hover-border-color);
    }
  }

  &.dense {
    padding: 5px 16px 2px 4px;

    .j-text-field-control-wrapper {
      min-height: 26px;
    }
  }

  &.regular {
    padding: 0;
    border-radius: 0;
    border: unset;
    border-bottom: map-get($j-text-field, border);

    &:hover {
      border-color: var(--j-primary-color);
    }

    .j-text-field-control-wrapper {
      min-height: 30px;
    }
  }
}

.j-text-field-control-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 40px;
}

.j-text-field {
  padding-right: 12px;
  padding-left: 0;
  width: 100%;
  outline: none;
  border: none;
  background: transparent;
}

.j-text-field-label {
  position: absolute;
  left: 0;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  color: rgba(0, 0, 0, 0.6);
  transform-origin: top left;
  transition: 300ms;
}

.j-text-field-underline {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: map-get($j-text-field, bg-underline-color);
}

.j-text-field-ripple {
  position: relative;
  bottom: 1px;
  width: 100%;
  height: 2px;
  transition: 300ms;
  opacity: 0;
  background-color: map-get($j-text-field, bg-ripple-color);
}

.j-text-field-close-wrapper {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
