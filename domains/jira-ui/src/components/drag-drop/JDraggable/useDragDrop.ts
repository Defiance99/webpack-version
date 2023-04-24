import { onMounted, onUnmounted } from 'vue';
import { InsertPosition } from '@/components/drag-drop/JDraggable/interfaces/InsertPosition.interface';
import { DragDropParams } from '@/components/drag-drop/JDraggable/interfaces/DragDropParams.interface';
import { MethodInsertTypes } from "@/components/drag-drop/JDraggable/types/MethodInsertTypes";
import { getNewPositionInColumnItems } from '@/components/drag-drop/JDraggable/utils/evalPointerPositions';

export default ({
  transitionTime,
  boardColumnSelector,
  columnItemSelector,
  boardSelector,
}: DragDropParams) => {
  let boardElement: HTMLElement | null = null;
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
  let methodInsert: MethodInsertTypes | null = null;
  let savedPlaceholderElement: HTMLElement | null = null;
  let columnsList: NodeListOf<HTMLElement> | null = null;
  let columnItems: Element[] | null = null;
  let expectedColumn = 0;
  let expectedOrder = 0;
  let initialScrollX = 0;
  let initialScrollY = 0;

  const setTargetDragCard = (card: HTMLElement | null): void => {
    dragTargetCard = card;
    isMouseDown = !!card;
  };

  const removePlaceholder = (): void => {
    savedPlaceholderElement?.remove();
    savedPlaceholderElement = null;
  };

  const addELementToColumn = (element: HTMLElement, order: number, methodInsert: MethodInsertTypes | null = null): void => {
    if (methodInsert === 'append') {
      columnsList?.[expectedColumn]?.append(element);
      return;
    }

    if (methodInsert === 'before' || methodInsert === 'after') {
      columnItems?.[expectedOrder]?.[methodInsert](element);
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

  const getPositionInColumnsOrder = (pointerPosition: MouseEvent): number => {
    if (columnsList === null) return expectedColumn;
    let currentColumnOrder = expectedColumn;

    for (let index = 0; index < columnsList.length; index += 1) {
      if (columnsList[index] === columnsList[expectedColumn]) continue;

      const columnRect: DOMRect = columnsList[index].getBoundingClientRect();

      if (
        pointerPosition.pageY >= columnRect.top
        && pointerPosition.pageX < columnRect.right
        && pointerPosition.pageY <= columnRect.bottom
        && pointerPosition.pageX > columnRect.left
      ) {
        currentColumnOrder = index;
        break;
      }
    }

    return currentColumnOrder;
  };

  const onMouseMove = async (event: MouseEvent): Promise<void> => {
    mousePos.y = event.clientY - window.scrollY;
    mousePos.x = event.clientX - window.scrollX;

    if (isMouseDown === false || dragTargetCard === null || columnItems === null) return;

    const currentColumnOrder = getPositionInColumnsOrder(event);
    let isNewColumn = false;

    if (currentColumnOrder !== expectedColumn) {
      expectedColumn = currentColumnOrder;
      isNewColumn = true;
      setNewColumnData();
    }

    const currentColumnItemsOrder: InsertPosition = getNewPositionInColumnItems(event, columnItems, isNewColumn);

    if (currentColumnItemsOrder.order !== null) {
      expectedOrder = currentColumnItemsOrder.order;
      methodInsert = currentColumnItemsOrder.method;

      addELementToColumn(savedPlaceholderElement as HTMLElement, expectedOrder, methodInsert);
    }

    dragTargetCard.style.top = `${mousePos.y - diffPos.y - initialScrollY}px`;
    dragTargetCard.style.left = `${mousePos.x - diffPos.x - initialScrollX}px`;
  };

  const dragStartHandler = async (event: MouseEvent): Promise<void> => {
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
      
      initialScrollY = boardElement?.scrollTop ?? 0;
      initialScrollX = boardElement?.scrollLeft ?? 0;

      const placeholderElement = createPlaceholder(targetCardElement);
      addELementToColumn(placeholderElement, expectedOrder);
      savedPlaceholderElement = placeholderElement;

      targetCardElement.style.width = `${targetCardElement.getBoundingClientRect().width}px`;
      targetCardElement.style.position = 'absolute';
      targetCardElement.style.top = `${initalItemY - initialScrollY}px`;
      targetCardElement.style.left = `${initalItemX - initialScrollX}px`;
      targetCardElement.style.zIndex = '100';
      targetCardElement.setAttribute('selected', '1');

      isTransitionEnd = false;
    }
  };

  const dragEndHandler = (): void => {
    isMouseDown = false;

    if (dragTargetCard === null) return;
    addELementToColumn(dragTargetCard, expectedOrder, methodInsert);

    columnsList = null;
    methodInsert = null;
    dragTargetCard.style.transition = '';
    dragTargetCard.style.top = `${(savedPlaceholderElement?.offsetTop ?? 0) - (boardElement?.scrollTop ?? 0)}px`;
    dragTargetCard.style.left = `${(savedPlaceholderElement?.offsetLeft ?? 0) - (boardElement?.scrollLeft ?? 0)}px`;
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
    boardElement = document.querySelector(boardSelector);
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
