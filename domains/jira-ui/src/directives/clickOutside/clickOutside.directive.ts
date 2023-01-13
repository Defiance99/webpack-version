/* eslint-disable import/prefer-default-export */
import type { Directive, DirectiveBinding } from 'vue';

let handleOutsideClick: ((event: MouseEvent) => void);

const isExcludeElement = (target: HTMLElement, exclude: HTMLElement): boolean => {
  if (Array.isArray(exclude)) {
    const isExcludeItem = exclude.some((excludeItem: HTMLElement): boolean => target === excludeItem);

    return isExcludeItem;
  }

  return target === exclude;
};

const onBind: Directive = (el: HTMLElement, binding: DirectiveBinding): void => {
  const { handler, exclude } = binding.value;

  handleOutsideClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    if (isExcludeElement(target, exclude)) return;
    if (el.contains(target) === false) {
      handler?.();
    }
  };

  document.addEventListener('click', handleOutsideClick);
};

const onUnbind: Directive = (): void => {
  document.removeEventListener('click', handleOutsideClick);
};

export const ClickOutside = {
  created: onBind,
  unmounted: onUnbind,
};
