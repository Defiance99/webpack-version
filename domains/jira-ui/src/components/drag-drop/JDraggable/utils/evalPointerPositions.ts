import { InsertPosition } from '@/components/drag-drop/JDraggable/interfaces/InsertPosition.interface';

const defaultMargin = 30;

const getNewPositionInColumnItems = (pointerPosition: MouseEvent, items: Element[], xPlane: boolean): InsertPosition => {
  const newTargetPosition: InsertPosition = {
    order: null,
    method: null,
  };

  if (items === null || items.length === 0) {
    newTargetPosition.order = 0;
    return newTargetPosition;
  }

  if (items.length === 1 && items[0].getAttribute('selected') === '1') {
    newTargetPosition.order = 0;
    return newTargetPosition;
  }

  for (let index = 0; index < items.length; index += 1) {
    if (items[index].getAttribute('selected') === '1') {
      continue;
    }

    const columnItemRect: DOMRect = items[index].getBoundingClientRect();

    if (pointerPosition.pageX < columnItemRect.left && pointerPosition.pageX > columnItemRect.right) {
      continue;
    }

    const lastSelectedElement = items[items.length - 1].getAttribute(('selected')) === '1';

    if (index === items.length - 1 || (index === items.length - 2 && lastSelectedElement)) {
      if (pointerPosition.pageY > columnItemRect.bottom) {
        newTargetPosition.order = index;
        newTargetPosition.method = 'append';
        break;
      }
    }

    if (
      xPlane === false &&
      pointerPosition.pageY <= columnItemRect.bottom &&
      pointerPosition.pageY >= columnItemRect.bottom - columnItemRect.height / 2 - defaultMargin
    ) {
      newTargetPosition.order = index;
      newTargetPosition.method = 'before';
      break;
    }

    if (
      xPlane === false &&
      pointerPosition.pageY > columnItemRect.top &&
      pointerPosition.pageY < columnItemRect.top + columnItemRect.height / 2 + defaultMargin
    ) {
      newTargetPosition.order = index;
      newTargetPosition.method = 'after';
      break;
    }

    if (
      xPlane &&
      pointerPosition.pageY <= columnItemRect.top + columnItemRect.height / 2
      ) {
      newTargetPosition.order = index;
      newTargetPosition.method = 'before';
      break;
    }

    if (xPlane && index === 0 && pointerPosition.pageY <= columnItemRect.top) {
      newTargetPosition.order = index;
      newTargetPosition.method = 'before';
      break;
    }
  }

  return newTargetPosition;
};

export {
  getNewPositionInColumnItems,
};