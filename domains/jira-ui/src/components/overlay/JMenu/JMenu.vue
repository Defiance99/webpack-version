<script lang="ts">
import {
  defineComponent, ref, watch, onUnmounted,
} from 'vue';
import { htmlIds } from '@/constants/id';

const onInputEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JMenu',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'below',
      validator: (value: string): boolean => ['below'].includes(value),
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    attach: {
      type: [String, Boolean],
      default: null,
    },
    maxHeight: {
      type: [Boolean],
      default: true,
    },
  },
  emits: [onInputEmitName],
  setup(props, { emit }) {
    const menuModel = ref<boolean>(false);
    const menuOverlayRef = ref<HTMLDivElement | null>(null);
    const contentMenuRef = ref<HTMLDivElement | null>(null);
    const menuActivatorElement = ref<HTMLElement | null>(null);
    let observer: ResizeObserver | null = null;

    const setMenuModel = (value: boolean): void => {
      menuModel.value = value;
      emit(onInputEmitName, value);
    };

    const defaultAttachValue = (): string | HTMLElement => htmlIds.overlayRoot;

    const setMenuPositions = (): void => {
      if (menuActivatorElement.value === null || menuOverlayRef.value === null || contentMenuRef.value === null) return;

      const menuCoords: DOMRect = menuOverlayRef.value.getBoundingClientRect();
      const activatorCoords: DOMRect = menuActivatorElement.value.getBoundingClientRect();
      const boxshadowOffset = 20;

      if (defaultAttachValue()) {
        menuOverlayRef.value.style.left = `${activatorCoords.right - menuCoords.width}px`;
        menuOverlayRef.value.style.top = `${activatorCoords.bottom}px`;
        menuOverlayRef.value.style.minWidth = `${activatorCoords.width}px`;
      }

      if (menuCoords.bottom + boxshadowOffset > window.innerHeight) {
        const menuMaxHeight = menuCoords.height - (menuCoords.bottom - window.innerHeight) - boxshadowOffset;
        contentMenuRef.value.style.maxHeight = `${menuMaxHeight}px`;
      }
    };

    const showMenu = (event: MouseEvent): void => {
      const target = event.currentTarget as HTMLElement;
      menuActivatorElement.value = target;

      setTimeout(() => {
        setMenuPositions();
      });

      setMenuModel(true);
    };

    watch(() => props.modelValue, (newVal: boolean): void => {
      setMenuModel(newVal);
    });

    watch(menuActivatorElement, (newVal: HTMLElement | null) => {
      if (newVal && menuActivatorElement.value) {
        observer = new ResizeObserver(setMenuPositions);
        observer.observe(menuActivatorElement.value);
      } else {
        observer?.disconnect();
      }
    });

    onUnmounted(() => {
      observer?.disconnect();
    });

    const closeMenu = (): void => {
      if (props.closeOnClick) {
        setMenuModel(false);
      }
    };

    return {
      htmlIds,
      closeMenu,
      menuModel,
      showMenu,
      setMenuModel,
      contentMenuRef,
      menuOverlayRef,
    };
  },
});
</script>

<template>
  <slot
    name="activator"
    :aria--haspopup="true"
    :aria--expanded="menuModel"
    @click="showMenu"
    @keypress.enter="showMenu"
    @keypress.space="showMenu"
  />

  <JOverlay
    :model-value="menuModel"
    :scrim="false"
    @update:model-value="setMenuModel(false)"
  />

  <Teleport
    :to="htmlIds.overlayRoot"
    :disabled="attach === false"
  >
    <div
      ref="menuOverlayRef"
      role="menu"
      tabindex="0"
      class="j-menu-wrapper"
      :class="{ attach: attach === false }"
    >
      <Transition name="opacity">
        <div
          v-show="menuModel"
          ref="contentMenuRef"
          class="j-menu-content"
          :data-position="position"
          :class="{ 'j-max-height': maxHeight }"
          @click="closeMenu"
          @keydown.esc.stop="setMenuModel(false)"
          @keypress.enter="closeMenu"
          @keypress.space="closeMenu"
        >
          <JFocusTrap :value="menuModel" />
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.j-menu-wrapper{
  position: absolute;
  z-index: 1000;

  &.attach {
    position: absolute;
    width: 100%;
  }
}

.j-menu-content {
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 4px;
  pointer-events: auto;
  background-color: #fff;
  box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
  overflow-y: auto;

  &.j-max-height {
    max-height: 304px;
  }

  &[data-position="below"] {
    transform-origin: right top;
  }
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 300ms ease;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>
