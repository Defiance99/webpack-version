<script lang="ts">
import {
  computed, defineComponent, ref, watch,
} from 'vue';
import ProjectBoardColumnItem from '@/modules/project-board/components/ProjectBoardColumnItem';

interface IssueCard {
  id: number;
  order: number;
  column: number;
}

export default defineComponent({
  name: 'ProjectBoardColumns',
  components: {
    ProjectBoardColumnItem,
  },
  props: {
    columns: {
      type: Array,
      default: () => [1, 2, 3, 4, 5],
    },
    height: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const dragTargetCard = ref<IssueCard | null>(null);
    const items = ref<IssueCard[]>([
      {
        id: 1,
        order: 1,
        column: 1,
      },
      {
        id: 2,
        order: 2,
        column: 1,
      },
      {
        id: 3,
        order: 3,
        column: 1,
      },
      {
        id: 4,
        order: 4,
        column: 1,
      },
      {
        id: 5,
        order: 5,
        column: 1,
      },
      {
        id: 6,
        order: 1,
        column: 2,
      },
      {
        id: 7,
        order: 2,
        column: 2,
      },
      {
        id: 8,
        order: 3,
        column: 2,
      },
      {
        id: 9,
        order: 4,
        column: 2,
      },
      {
        id: 10,
        order: 5,
        column: 2,
      },
      {
        id: 11,
        order: 6,
        column: 2,
      },
    ]);
    const projectBoardRef = ref<HTMLDivElement | null>(null);

    const toggleDashedBorderToColumn = (targetCard: IssueCard, addBorder: boolean): void => {
      const columnsElements = document.querySelectorAll('.project-board-columns .board-columns-body-list-item');

      if (columnsElements.length === 0) return;

      for (let index = 0; index < columnsElements.length; index += 1) {
        if (addBorder === false || targetCard.column !== index + 1) {
          const columnElement = columnsElements[index];

          if (addBorder) {
            columnElement.classList.add('dashed-column');
          } else {
            columnElement.classList.remove('dashed-column');
          }
        }
      }
    };

    const setCardList = (cardList: IssueCard[]): void => {
      items.value = cardList;
    };

    const setTargetDragCard = (card: IssueCard): void => {
      dragTargetCard.value = card;
    };

    const dragStartHandler = (event: DragEvent, card: IssueCard): void => {
      setTargetDragCard(card);

      toggleDashedBorderToColumn(card, true);
    };

    const dragEndHandler = (event: DragEvent, card: IssueCard): void => {
      dragTargetCard.value = null;

      toggleDashedBorderToColumn(card, false);
    };

    const dragOverHandler = (event: DragEvent, card: any): void => {
      event.preventDefault();
    };

    const updateOrdersInColumn = (column: number): IssueCard[] => {
      let currentOrder = 1;

      return items.value.map((item: IssueCard) => {
        if (item.column === column) {
          const copyItem = { ...item };
          copyItem.order = currentOrder;
          currentOrder += 1;

          return copyItem;
        }

        return item;
      });
    };

    const swapOrdersInColumn = (dropTargetCard: IssueCard): IssueCard[] => items.value.map((item: IssueCard) => {
      if (item.id === dropTargetCard.id) {
        if (item.column === dragTargetCard.value?.column) {
          return {
            ...item,
            order: dragTargetCard.value?.order,
          };
        }
      }

      if (item.id === dragTargetCard.value?.id) {
        if (item.column === dropTargetCard.column) {
          return {
            ...item,
            order: dropTargetCard.order,
          };
        }
      }

      return item;
    });

    const dragDropHandler = (event: DragEvent, dropTargetCard: IssueCard): void => {
      event.preventDefault();

      if (dragTargetCard.value === null) return;

      if (dragTargetCard.value.column === dropTargetCard.column) {
        setCardList(swapOrdersInColumn(dropTargetCard));
        setCardList(updateOrdersInColumn(dropTargetCard.column));
      } else {
        setCardList(updateOrdersInColumn(dropTargetCard.column));
        setCardList(updateOrdersInColumn(dragTargetCard.value.column));
      }
    };

    const dragOverCoumnHandler = (event: DragEvent, column: any): void => {
      event.preventDefault();
    };

    const dragDropColumnHandler = (event: DragEvent, column: any): void => {
      event.preventDefault();

      if (dragTargetCard.value) {
        dragTargetCard.value.column = column;
      }
    };

    const sortItems = (a: IssueCard, b: IssueCard) => {
      if (a.column === b.column) {
        return a.order > b.order ? 1 : -1;
      }

      return 0;
    };

    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    const sortedItems = computed(() => items.value.sort(sortItems));

    watch(
      () => props.height,
      (newHeight) => {
        if (projectBoardRef.value) {
          projectBoardRef.value.style.height = `${newHeight}px`;
        }
      },
    );

    return {
      sortedItems,
      dragStartHandler,
      dragEndHandler,
      dragOverHandler,
      dragDropHandler,
      dragOverCoumnHandler,
      dragDropColumnHandler,
      projectBoardRef,
    };
  },
});
</script>

<template>
  <div class="project-board-columns">
    <div
      ref="projectBoardRef"
      class="project-board-wrapper"
    >
      <div class="project-board-header">
        <ul class="board-columns-list">
          <li
            v-for="(column, index) in columns"
            :key="index"
            class="board-columns-header-list-item board-columns-list-item"
          >
            <h2 class="text-body-2">
              {{ column }} todo
            </h2>
          </li>
        </ul>
      </div>
      <ul class="board-columns-list">
        <li
          v-for="(column, index) in columns"
          :key="index"
          class="board-columns-body-list-item board-columns-list-item"
          @dragover="dragOverCoumnHandler($event, column)"
          @drop="dragDropColumnHandler($event, column)"
        >
          <template v-for="item in sortedItems">
            <ProjectBoardColumnItem
              v-if="item.column === column"
              :key="`${item.id}-${item.order}-${item.column}`"
              :item="item"
              draggable="true"
              @dragstart="dragStartHandler($event, item)"
              @dragend="dragEndHandler($event, item)"
              @dragover="dragOverHandler($event, item)"
              @drop="dragDropHandler($event, item)"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width-scroll: 5px;

.project-board-header {
  position: sticky;
  top: 0;
  z-index: 10;
  margin-bottom: 10px;
}

.project-board-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: -40px;
  padding-right: 10px;
  max-width: calc(100vw - var(--sidebar-width) - var(--resizer-width) - var(--project-page-padding-left) - $width-scroll);
  overflow: auto;
}

.board-columns-list {
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(162px, 1fr));
  height: 100%;
}

.board-columns-header-list-item {
  padding: 16px;
  text-transform: uppercase;
  border-radius: 4px 4px 0 0;
  color: #5e6c84;
  box-shadow: 0px 0px 3px 3px var(--j-primary-text-color);
}

.board-columns-list-item {
  grid-row: 1;
  min-width: 162px;
  background-color: var(--j-ds-background);
}

.board-columns-body-list-item {
  position: relative;
  padding: 1px 5px 0;
  border-radius: 4px;

  &.dashed-column {
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 6px;
      left: 0;
      width: 100%;
      height: calc(100% - 6px);
      border: var(--j-primary-color) 1px dashed;
      background-color: var(--j-ds-background-selected);
    }
  }
}
</style>
