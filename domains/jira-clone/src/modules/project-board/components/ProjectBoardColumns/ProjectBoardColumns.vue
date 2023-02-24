<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  PropType,
} from 'vue';
import { ProjectBoard, ProjectColumn } from '@/interfaces/Project.interfcace';
import IssueCard from '@/components/card/IssueCard';
import useProjectsStore from '@/composables/store/useProjectsStore';
import useSetGetUtils from '@/composables/utils/useSetGetUtils';

export default defineComponent({
  name: 'ProjectBoardColumns',
  components: {
    IssueCard,
  },
  props: {
    board: {
      type: Object as PropType<ProjectBoard>,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    isLoad: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { setter: setBoardList, getter: getBoardList } = useSetGetUtils<ProjectColumn[] | null>(null);
    const itemsWrapperRef = ref<HTMLElement | null>(null);

    const { getCurrentProjectPage } = useProjectsStore();

    watch(
      () => props.height,
      (newHeight) => {
        if (itemsWrapperRef.value) {
          itemsWrapperRef.value.style.height = `${newHeight}px`;
        }
      },
    );

    watch(
      () => props.board,
      (newItems: ProjectBoard) => {
        setBoardList(newItems.columns);
      },
    );

    return {
      getBoardList,
      itemsWrapperRef,
      getCurrentProjectPage,
    };
  },
});
</script>

<template>
  <div class="project-board-columns">
    <div ref="itemsWrapperRef" class="project-board-wrapper">
      <div class="project-board-header">
        <ul v-if="getBoardList" class="board-columns-list">
          <li
            v-for="(column, index) in getBoardList"
            :key="index"
            class="board-columns-header-list-item board-columns-list-item"
          >
            <h2 class="text-body-2">
              {{ column.name }}
            </h2>
          </li>
        </ul>
        <div v-else class="board-columns-list">
          <JSkeleton
            v-for="(_, index) in 5"
            :key="index"
            height="50px"
            width="100%"
            class="board-columns-header-list-item board-columns-list-item"
          />
        </div>
      </div>
      <JDraggable
        v-if="isLoad === false"
        :transition-time="400"
        column-selector=".board-columns-body-list-item"
        column-item-selector=".issue-card"
        class="board-columns-list"
      >
        <div
          v-for="(column, columnIndex) in getBoardList"
          :key="columnIndex"
          class="board-columns-body-list-item board-columns-list-item"
        >
          <template v-for="(columnItem, columnItemIndex) in column.issues">
            <IssueCard
              v-if="getCurrentProjectPage"
              :key="`${columnIndex}/${columnItemIndex}`"
              :issue="columnItem"
              :project="getCurrentProjectPage"
              tabindex="0"
            />
          </template>
        </div>
      </JDraggable>
      <div v-else class="board-columns-list">
        <JSkeleton
          v-for="(_, index) in 5"
          :key="index"
          height="70vh"
          width="100%"
          class="skeleton-projects-list-item"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$width-scroll: 5px;

.project-board-header {
  position: sticky;
  z-index: 10;
  top: 0;
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
  padding: 8px 5px 0;
  border-radius: 4px;
}

.issue-card {
  margin-bottom: 6px;
}
</style>
