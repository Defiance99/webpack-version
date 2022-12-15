<script lang="ts">
import { defineComponent } from 'vue';

const inputEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JOverlay',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    scrim: {
      type: Boolean,
      default: true,
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: [inputEmitName],
  setup(props, { emit }) {
    const closeOverlay = (): void => {
      if (props.closeOnClick) {
        emit(inputEmitName, false);
      }
    };

    return {
      closeOverlay,
    };
  },
});
</script>

<template>
  <div
    class="j-overlay"
    :class="{ active: modelValue }"
    @click="closeOverlay"
    @keydown.space="closeOverlay"
    @keydown.enter="closeOverlay"
  >
    <div :class="{ 'j-overlay-scrim': scrim }" />
  </div>
</template>

<style scoped lang="scss">
.j-overlay {
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: auto;

    .j-overlay-scrim {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: 300ms cubic-bezier(0.25, 0.8, 0.5, 1);
      opacity: 0.46;
      background-color: rgb(33, 33, 33);
    }
  }
}
</style>
