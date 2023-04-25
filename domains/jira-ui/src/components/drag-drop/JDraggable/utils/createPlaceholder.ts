const createPlaceholder = (inheritElement: HTMLElement): HTMLElement => {
  const elementPlaceholder = document.createElement('div');

  elementPlaceholder.classList.add('j-target-placeholder');
  elementPlaceholder.style.position = 'relative';
  elementPlaceholder.style.width = `${inheritElement.getBoundingClientRect().width}px`;
  elementPlaceholder.style.height = `${inheritElement.getBoundingClientRect().height}px`;

  return elementPlaceholder;
};

export {
  createPlaceholder,
};
