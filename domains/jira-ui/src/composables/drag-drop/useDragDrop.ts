import { onMounted, onUnmounted } from 'vue';

interface DragDropParams {
  transitionTime: number;
  boardColumnSelector: string;
  columnItemSelector: string;
}

type ForceMethod = 'prepend' | 'after' | 'before';

interface targetNewPositionInfo {
  order: number | null,
  method: ForceMethod | null,
}

export default ({
  transitionTime,
  boardColumnSelector,
  columnItemSelector,
}: DragDropParams) => {
  let dragTargetCard: HTMLElement | null = null;
  const mousePos = {
    x: 0,
    y: 0,
  };
  const diffPos = {
    x: 0,
    y: 0,
  };
  let isTransitionEnd = true;
  let isMouseDown = false;
  let forceMethod: ForceMethod | null = null;
  let savedPlaceholderElement: HTMLElement | null = null;
  let columnsList: NodeListOf<HTMLElement> | null = null;
  let columnItems: Element[] | null = null;
  let expectedColumn = 0;
  let expectedOrder = 0;

  const setTargetDragCard = (card: HTMLElement | null): void => {
    dragTargetCard = card;
    isMouseDown = !!card;
  };

  const removePlaceholder = (): void => {
    savedPlaceholderElement?.remove();
    savedPlaceholderElement = null;
  };

  const addELementToColumn = (element: HTMLElement, order: number, forceMethod: ForceMethod | null = null): void => {
    if (forceMethod === 'prepend') {
      columnsList?.[expectedColumn]?.append(element);
      return;
    }

    if (forceMethod === 'before') {
      columnItems?.[expectedOrder]?.before(element);
      return;
    }

    if (forceMethod === 'after') {
      columnItems?.[expectedOrder]?.after(element);
      return;
    }

    if (order === 0) {
      columnsList?.[expectedColumn]?.prepend(element);
    } else if (order === columnItems?.length) {
      columnsList?.[expectedColumn]?.append(element);
    } else {
      columnItems?.[expectedOrder]?.after(element);
    }
  };

  const setNewColumnData = (): void => {
    if (dragTargetCard === null) return;

    let targetColumn: HTMLElement | null = null;

    if (columnsList === null) {
      targetColumn = dragTargetCard.closest(boardColumnSelector) as HTMLElement;
    } else {
      targetColumn = columnsList[expectedColumn];
    }

    const columnItemClass = columnItemSelector.replace('.', '');

    columnsList = document.querySelectorAll(boardColumnSelector);
    columnItems = [...targetColumn.children].filter((columnItem) => columnItem.classList.contains(columnItemClass));

    columnsList.forEach((boardColumn, index) => {
      if (boardColumn === targetColumn) {
        expectedColumn = index;
      }
    });
  };

  const createPlaceholder = (inheritElement: HTMLElement): HTMLElement => {
    const elementPlaceholder = document.createElement('div');

    elementPlaceholder.classList.add('j-target-placeholder');
    elementPlaceholder.style.position = 'relative';
    elementPlaceholder.style.width = `${inheritElement.getBoundingClientRect().width}px`;
    elementPlaceholder.style.height = `${inheritElement.getBoundingClientRect().height}px`;

    return elementPlaceholder;
  };

  const checkNewPositionInColumnsOrder = (pointerPosition: MouseEvent): boolean => {
    if (columnsList === null) return false;
    let isNewColumn = false;

    for (let index = 0; index < columnsList.length; index += 1) {
      if (columnsList[index] === columnsList[expectedColumn]) continue;

      const columnRect: DOMRect = columnsList[index].getBoundingClientRect();

      if (
        pointerPosition.pageY >= columnRect.top
        && pointerPosition.pageX < columnRect.right
        && pointerPosition.pageY <= columnRect.bottom
        && pointerPosition.pageX > columnRect.left
      ) {
        expectedColumn = index;
        isNewColumn = true;
        break;
      }
    }

    return isNewColumn;
  };

  const checkNewPositionInColumnItems = (pointerPosition: MouseEvent, items: Element[]): any => {
    const newTargetPosition: targetNewPositionInfo = {
      order: null,
      method: null,
    };

    if (items === null) {
      newTargetPosition.order = 0;
      return newTargetPosition;
    }

    if (items.length === 0) {
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

      if (index === items.length - 1) {
        if (pointerPosition.pageY > columnItemRect.bottom) {
          newTargetPosition.order = index;
          newTargetPosition.method = 'prepend';
          break;
        }
      }

      if (
        pointerPosition.pageY <= columnItemRect.bottom
        && pointerPosition.pageY >= columnItemRect.bottom - columnItemRect.height / 2
      ) {
        newTargetPosition.order = index;
        newTargetPosition.method = 'before';
        break;
      }

      if (pointerPosition.pageY > columnItemRect.top && pointerPosition.pageY < columnItemRect.top + columnItemRect.height / 2) {
        newTargetPosition.order = index;
        newTargetPosition.method = 'after';
        break;
      }
    }

    return newTargetPosition;
  };

  const onMouseMove = async (event: MouseEvent): Promise<void> => {
    mousePos.y = event.clientY - window.scrollY;
    mousePos.x = event.clientX - window.scrollX;

    if (isMouseDown === false || dragTargetCard === null || columnItems === null) return;

    const isNewColumn = checkNewPositionInColumnsOrder(event);
    const newOrderValue: targetNewPositionInfo = checkNewPositionInColumnItems(event, columnItems);

    if (isNewColumn) {
      setNewColumnData();
    }

    if (newOrderValue.order !== null) {
      expectedOrder = newOrderValue.order;
      forceMethod = newOrderValue.method;

      addELementToColumn(savedPlaceholderElement as HTMLElement, expectedOrder, forceMethod);
    }

    dragTargetCard.style.top = `${mousePos.y - diffPos.y}px`;
    dragTargetCard.style.left = `${mousePos.x - diffPos.x}px`;
  };

  const dragStartHandler = (event: MouseEvent): void => {
    const targetElement = event.target as HTMLElement;
    const targetCardElement = targetElement.closest(columnItemSelector) as HTMLElement;

    if (targetCardElement && isTransitionEnd) {
      setTargetDragCard(targetCardElement);
      setNewColumnData();

      columnItems?.forEach((columnItem, index) => {
        if (columnItem === dragTargetCard) {
          expectedOrder = index;
        }
      });

      targetCardElement.style.transition = 'unset';

      diffPos.y = mousePos.y - targetCardElement.offsetTop;
      diffPos.x = mousePos.x - targetCardElement.offsetLeft;

      const initalItemY = mousePos.y - diffPos.y;
      const initalItemX = mousePos.x - diffPos.x;

      const placeholderElement = createPlaceholder(targetCardElement);
      addELementToColumn(placeholderElement, expectedOrder);
      savedPlaceholderElement = placeholderElement;

      targetCardElement.style.width = `${targetCardElement.getBoundingClientRect().width}px`;
      targetCardElement.style.position = 'absolute';
      targetCardElement.style.top = `${initalItemY}px`;
      targetCardElement.style.left = `${initalItemX}px`;
      targetCardElement.style.zIndex = '1000';
      targetCardElement.setAttribute('selected', '1');

      isTransitionEnd = false;
    }
  };

  const dragEndHandler = (): void => {
    isMouseDown = false;

    if (dragTargetCard === null) return;
    addELementToColumn(dragTargetCard, expectedOrder, forceMethod);

    columnsList = null;
    forceMethod = null;
    dragTargetCard.style.transition = '';
    dragTargetCard.style.top = `${savedPlaceholderElement?.offsetTop}px`;
    dragTargetCard.style.left = `${savedPlaceholderElement?.offsetLeft}px`;
    dragTargetCard.removeAttribute('selected');

    setTimeout(() => {
      if (dragTargetCard) {
        removePlaceholder();
        dragTargetCard.style.position = 'relative';
        dragTargetCard.style.top = '';
        dragTargetCard.style.left = '';
        dragTargetCard.style.width = '';
        dragTargetCard.style.zIndex = '';
        isTransitionEnd = true;
        setTargetDragCard(null);
      }
    }, transitionTime);
  };

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', dragEndHandler);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', dragEndHandler);
  });

  return {
    dragStartHandler,
    dragEndHandler,
  };
};
