import { ref } from 'vue';

const overlaysState = ref<{(): void; }[]>([]);

export default () => {
  const addOverlayToState = (overlay: () => void): void => {
    overlaysState.value.push(overlay);
  };

  const removeLastOverlay = (): void => {
    overlaysState.value.pop();
  };

  const closeLastOverlay = (): void => {
    const lastOverlay = overlaysState.value?.[overlaysState.value.length - 1];

    if (lastOverlay) {
      lastOverlay();
    }
  };

  return {
    addOverlayToState,
    removeLastOverlay,
    closeLastOverlay,
  };
};
