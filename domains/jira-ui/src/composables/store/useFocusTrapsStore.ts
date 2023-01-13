import { shallowRef } from 'vue';

const focusTrapsStore = shallowRef<HTMLDivElement[]>([]);

export default () => {
  const setFocusOnLastElement = (): void => {
    focusTrapsStore.value[focusTrapsStore.value.length - 1]?.focus();
  };

  const addFocusTrap = (focusTrapElement: HTMLDivElement): void => {
    focusTrapsStore.value.push(focusTrapElement);

    setTimeout(() => {
      focusTrapElement.focus();
    });
  };

  const removeLastFocusTrap = (setFocus = true): void => {
    focusTrapsStore.value.pop();

    if (setFocus) {
      setFocusOnLastElement();
    }
  };

  return {
    addFocusTrap,
    removeLastFocusTrap,
  };
};
