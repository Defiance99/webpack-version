import type { Directive, DirectiveBinding } from 'vue';

import './rippleEffect.scss';

export const removeRipple = (
  element: HTMLElement | null,
  setAnimateStatus: boolean,
  setRippleUp: boolean,
): void => {
  if (element === null) return;

  const rippleContainers = element.querySelectorAll('span.ui-ripple-container');

  if (rippleContainers.length === 0) return;

  const firstRipple = rippleContainers[0];
  const lastRipple = rippleContainers[rippleContainers.length - 1];

  if (setAnimateStatus) {
    firstRipple.setAttribute('data-is-animated', '1');
  }

  if (setRippleUp) {
    lastRipple.setAttribute('data-is-mouse-upped', '1');
  }

  if (firstRipple.getAttribute('data-is-animated') && firstRipple.getAttribute('data-is-mouse-upped')) {
    firstRipple.remove();
  }
};

export const createRipple = (event: MouseEvent): void => {
  const element = event.currentTarget as HTMLElement;
  const rippleTransition = 500;

  const rippleContainer = document.createElement('span');
  const circle = document.createElement('span');

  const elementRect = element.getBoundingClientRect();
  const diameter = Math.max(elementRect.width, elementRect.height);
  const radius = diameter / 2;

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.top = `${event.clientY - elementRect.top - radius}px`;
  circle.style.left = `${event.clientX - elementRect.left - radius}px`;
  circle.style.transitionDuration = `${rippleTransition}ms`;

  circle.classList.add('ui-ripple-effect');
  rippleContainer.classList.add('ui-ripple-container');

  rippleContainer.appendChild(circle);
  element.appendChild(rippleContainer);

  setTimeout(() => {
    circle.classList.add('ui-ripple-animation');
  });

  setTimeout(() => {
    removeRipple(element, true, false);
  }, rippleTransition - 20);
};

const callRemoveRipple = (event: MouseEvent): void => {
  removeRipple(event.currentTarget as HTMLElement, false, true);
};

const onBind: Directive = (el: HTMLElement, binding: DirectiveBinding): void => {
  if (binding.value?.disabled === true) return;

  el.addEventListener('mousedown', createRipple);
  el.addEventListener('mouseup', callRemoveRipple);
  el.addEventListener('mouseleave', callRemoveRipple);
};

const onUnbind: Directive = (el: HTMLElement): void => {
  el.removeEventListener('mousedown', createRipple);
  el.removeEventListener('mouseup', callRemoveRipple);
  el.removeEventListener('mouseleave', callRemoveRipple);
};

export const Ripple = {
  created: onBind,
  unmounted: onUnbind,
};
