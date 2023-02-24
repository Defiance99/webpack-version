<script lang="ts">
import { computed, defineComponent } from 'vue';

const inputEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'left',
      validator: (value: string): boolean => ['right', 'left'].includes(value),
    },
  },
  emits: [inputEmitName],
  setup(props, { emit }) {
    const drawerModel = computed({
      set(value: boolean): void {
        emit(inputEmitName, value);
      },
      get() {
        return props.modelValue;
      },
    });

    const close = (): void => {
      drawerModel.value = false;
    };

    return {
      drawerModel,
      close,
    };
  },
});
</script>

<template>
  <div>
    <Teleport to="#j-overlay-container">
      <JOverlay v-model="drawerModel" />

      <Transition
        name="translate"
      >
        <div
          v-show="drawerModel"
          :data-position="position"
          class="j-drawer-container"
          @keydown.esc="close"
        >
          <JFocusTrap :value="drawerModel" />
          <slot name="drawer" />
        </div>
      </Transition>
    </Teleport>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.j-drawer-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  padding: 24px;
  min-width: 200px;
  overflow-y: auto;
  background: #fff;
  transition: 200ms cubic-bezier(.4,0,.2,1);
  pointer-events: auto;
  will-change: transform;
  box-shadow: 0 8px 10px -5px #0003, 0 16px 24px 2px #00000024, 0 6px 30px 5px #0000001f;

  &[data-position="left"] {
    left: 0;
  }

  &[data-position="right"] {
    right: 0;
  }
}

.translate-enter-from,
.translate-leave-to {
  &[data-position="left"] {
    transform: translateX(-100%);
  }

  &[data-position="right"] {
    transform: translateX(100%);
  }
}
</style>
