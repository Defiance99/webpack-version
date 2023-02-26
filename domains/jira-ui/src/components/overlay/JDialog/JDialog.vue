<script lang="ts">
import {
  defineComponent, ref, watch,
} from 'vue';

const inputEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: [inputEmitName],
  setup(props, { emit }) {
    const dialogModel = ref<boolean>(false);

    const setDialogModel = (value: boolean): void => {
      dialogModel.value = value;
      emit(inputEmitName, value);
    };

    const open = (): void => {
      setDialogModel(true);
    };

    const close = (): void => {
      setDialogModel(false);
    };

    watch(
      () => props.modelValue,
      (newVal: boolean): void => {
        setDialogModel(newVal);
      },
    );

    return {
      dialogModel,
      setDialogModel,
      open,
      close,
    };
  },
});
</script>

<template>
  <slot
    name="activator"
    @click="open"
    @keypress.space="open"
  />

  <Teleport to="#j-overlay-container">
    <JOverlay
      v-if="dialogModel"
      :model-value="dialogModel"
      @update:model-value="close"
    />

    <Transition
      name="scale"
    >
      <div
        v-if="dialogModel"
        class="j-dialog-container"
        @keydown.esc.stop="close"
      >
        <JFocusTrap />
        <div
          tabindex="0"
          class="j-dialog-content"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.j-dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition: 300ms cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1ms;
}

.j-dialog-content {
  position: static;
  margin: 12px;
  padding: 24px;
  max-width: calc(100vw - 50px);
  max-height: calc(100vh - 120px);
  border-radius: 4px;
  box-shadow: 0 11px 15px -7px #0003, 0 24px 38px 3px #00000024, 0 9px 46px 8px #0000001f;
  background: var(--j-secondary-color);
  color: var(--j-default-text-color);
  pointer-events: auto;
  outline: none;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale3d(0.4, 0.4, 0.4);
}

.scale-enter-to,
.scale-leavel-from {
  opacity: 1;
  transform: scale3d(1, 1, 1);
}
</style>
