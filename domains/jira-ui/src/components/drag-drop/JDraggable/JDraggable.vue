<script lang="ts">
import { defineComponent } from 'vue';
import useDragDrop from '@/composables/drag-drop/useDragDrop';

const onModelValueEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JDraggable',
  props: {
    columnItemSelector: {
      type: String,
      required: true,
    },
    columnSelector: {
      type: String,
      required: true,
    },
    transitionTime: {
      type: Number,
      default: 400,
    },
  },
  emits: [onModelValueEmitName],
  setup(props) {
    const { dragStartHandler } = useDragDrop({
      transitionTime: props.transitionTime,
      boardColumnSelector: props.columnSelector,
      columnItemSelector: props.columnItemSelector,
    });

    return {
      dragStartHandler,
    };
  },
});
</script>

<template>
  <div @mousedown="dragStartHandler">
    <slot />
  </div>
</template>

<style lang="scss">
.j-target-placeholder {
  margin-bottom: 6px;

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    top: 6px;
    left: 0;
    width: 100%;
    height: calc(100% - 6px);
    border: var(--j-primary-color) 1px dashed;
    background-color: var(--j-ds-background-selected);
  }
}
</style>
