<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import AppBreadcrumbs from '@/components/shared/AppBreadcrumbs';
import PageTitle from '@/components/title/PageTitle';
import ProjectPageContainer from '@/components/shared/ProjectPageContainer';
import ProjectBoardFilter from '@/modules/project-board/components/ProjectBoardFilter';
import ProjectBoardColumns from '@/modules/project-board/components/ProjectBoardColumns';
import useProjectBoardStore from '@/composables/store/useProjectBoardStore';

export default defineComponent({
  components: {
    AppBreadcrumbs,
    PageTitle,
    ProjectPageContainer,
    ProjectBoardFilter,
    ProjectBoardColumns,
  },
  setup() {
    const { initProjectBoard, isLoad, getProjectBoard } = useProjectBoardStore();
    const boardColumnsHeight = ref<number | null>(null);

    const setBoardHeaderHeight = async (): Promise<void> => {
      const boardPage: HTMLDivElement | null = document.querySelector('.project-board-page');

      if (boardPage === null) return;

      const boardHeaderElement: HTMLDivElement | null = boardPage.querySelector('.project-board-page-header');

      if (boardHeaderElement === null) return;

      boardColumnsHeight.value = boardPage.offsetHeight - boardHeaderElement.offsetHeight;
    };

    onMounted(() => {
      setBoardHeaderHeight();
      window.addEventListener('resize', setBoardHeaderHeight);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', setBoardHeaderHeight);
    });

    initProjectBoard();

    return {
      isLoad,
      getProjectBoard,
      boardColumnsHeight,
    };
  },
});
</script>

<template>
  <ProjectPageContainer class="project-board-page">
    <div class="project-board-page-header pt-7 pb-7">
      <AppBreadcrumbs :top-margin="false" />

      <PageTitle> Board </PageTitle>

      <ProjectBoardFilter />
    </div>

    <ProjectBoardColumns
      :board="getProjectBoard"
      :height="boardColumnsHeight ?? 0"
      :is-load="isLoad"
    />
  </ProjectPageContainer>
</template>
