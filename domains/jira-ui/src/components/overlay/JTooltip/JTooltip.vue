<script lang="ts">
import {
  computed, defineComponent, h, ref, watch,
} from 'vue';
import useThrottle from '@/composables/utils/useThrottle';
import useAttachContent from '@/composables/useAttachContent';
import { htmlIds } from '@/constants/id';

const emitUpdateName = 'update:modelValue';

const labelSizes: { [key: string]: string } = {
  s: 'size-s',
  xs: 'size-xs',
};

export default defineComponent({
  name: 'JTooltip',
  props: {
    openOnHover: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'bottom',
      validator: (value: string): boolean => ['bottom'].includes(value),
    },
    attach: {
      type: [HTMLElement, String],
      default: Document,
    },
    labelSize: {
      type: String,
      default: 'xs',
      validator: (value: string): boolean => ['s', 'xs'].includes(value),
    },
  },
  emits: [emitUpdateName],
  setup(props, { emit }) {
    const isShowTooltip = ref<boolean>(false);
    const isShowTooltipContent = ref<boolean>(false);
    const tooltipOverlayRef = ref<HTMLDivElement | null>(null);
    const tooltipActivatorElement = ref<HTMLElement | null>(null);
    const attachElement = computed(() => useAttachContent(props.attach));
    let isSetDocumentListenerEvent = false;

    const setTooltipDisplay = (display: boolean): void => {
      isShowTooltip.value = display;
      emit(emitUpdateName, display);
    };

    const setTooltipContentDisplay = (display: boolean): void => {
      isShowTooltipContent.value = display;
    };

    const setTooltipActivator = (tooltipActivator: HTMLElement): void => {
      tooltipActivatorElement.value = tooltipActivator;
    };

    const setTooltipPositions = (): void => {
      if (tooltipActivatorElement.value === null || tooltipOverlayRef.value === null) return;

      const overlayCoords: DOMRect = tooltipOverlayRef.value.getBoundingClientRect();
      const activatorCoords: DOMRect = tooltipActivatorElement.value.getBoundingClientRect();

      tooltipOverlayRef.value.style.left = `${activatorCoords.right - activatorCoords.width / 2 - overlayCoords.width / 2}px`;
      tooltipOverlayRef.value.style.top = `${activatorCoords.bottom}px`;
    };

    const throttledSetTooltipPositions = useThrottle(setTooltipPositions, 20);

    const showTooltip = (tooltipActivator: EventTarget | null): void => {
      setTooltipDisplay(true);

      setTimeout(() => {
        setTooltipContentDisplay(true);
      });

      setTimeout(() => {
        const activatorTarget = tooltipActivator as HTMLElement;
        setTooltipActivator(activatorTarget);
        setTooltipPositions();
      });
    };

    const processShowEvent = (isClick: boolean, event: MouseEvent, openOnHover = props.openOnHover): void => {
      if (isClick && openOnHover === false) {
        showTooltip(event.currentTarget);
      }

      if (isClick === false && openOnHover) {
        showTooltip(event.currentTarget);
      }
    };

    const closeTooltip = (): void => {
      setTooltipContentDisplay(false);
    };

    const checkCurrentPointerPosition = async (event: MouseEvent): Promise<void> => {
      const activatorCoords: DOMRect | undefined = tooltipActivatorElement.value?.getBoundingClientRect();

      if (activatorCoords === undefined) return;

      if (
        activatorCoords.top >= event.pageY ||
        activatorCoords.bottom <= event.pageY ||
        activatorCoords.left >= event.pageX ||
        activatorCoords.right <= event.pageX
      ) {
        closeTooltip();
        document.removeEventListener('mousemove', checkCurrentPointerPosition);
        isSetDocumentListenerEvent = false;
      }
    };

    const onMouseEnter = (event: MouseEvent): void => {
      processShowEvent(false, event);

      if (isSetDocumentListenerEvent === false) {
        document.addEventListener('mousemove', checkCurrentPointerPosition);
        isSetDocumentListenerEvent = true;
      }
    };

    watch(isShowTooltip, async (newVal: boolean): Promise<void> => {
      if (newVal) {
        attachElement.value?.addEventListener('scroll', throttledSetTooltipPositions);
      } else {
        attachElement.value?.removeEventListener('scroll', throttledSetTooltipPositions);
        tooltipActivatorElement.value = null;
      }
    });

    return {
      onMouseEnter,
      htmlIds,
      labelSizes,
      isShowTooltip,
      isShowTooltipContent,
      tooltipOverlayRef,
      closeTooltip,
      processShowEvent,
      setTooltipDisplay,
    };
  },
});
</script>

<template>
  <slot
    name="activator"
    tabindex="0"
    @click="processShowEvent(true, $event)"
    @focus="processShowEvent(false, $event)"
    @keypress.enter="processShowEvent(true, $event)"
    @mouseenter="onMouseEnter"
    @blur="closeTooltip"
  />

  <Teleport :to="htmlIds.overlayRoot">
    <div
      v-if="isShowTooltip"
      ref="tooltipOverlayRef"
      class="j-tooltip-overlay"
    >
      <Transition
        name="scale"
        @after-leave="setTooltipDisplay(false)"
      >
        <div
          v-show="isShowTooltipContent"
          class="j-tooltip-content"
          :data-position="position"
          :class="labelSizes[labelSize]"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@import './_variables.scss';

.j-tooltip-overlay {
  display: flex;
  position: absolute;
  z-index: 1000;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  transition: 100ms ease;
}

.j-tooltip-content {
  position: relative;
  z-index: 1000;
  margin: 6px;
  padding: 6px 8px;
  width: max-content;
  border-radius: map-get($j-tooltip, border-radius);
  color: map-get($j-tooltip, color);
  text-transform: none;
  text-overflow: ellipsis;
  background: map-get($j-tooltip, bg-color);
  pointer-events: none;
  transform-origin: center top;

  &.size-s {
    font-size: map-get($j-tooltip, sizes, s, font-size);
    line-height: map-get($j-tooltip, sizes, s, line-height);
  }

  &.size-xs {
    font-size: map-get($j-tooltip, sizes, xs, font-size);
    line-height: map-get($j-tooltip, sizes, xs, line-height);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
  }

  &[data-position='bottom'] {
    &::before {
      border-color: transparent transparent map-get($j-tooltip, bg-color) transparent;
    }
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: map-get($j-tooltip, animation-properties);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale3d(0, 0, 0);
}
</style>
