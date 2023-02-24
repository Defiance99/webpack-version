<script lang="ts">
import { defineComponent, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/default.vue';
import ProjectSidebar from '@/components/shared/ProjectSidebar';
import useProjectsStore from '@/composables/store/useProjectsStore';

export default defineComponent({
  name: 'ProjectLayout',
  components: {
    DefaultLayout,
    ProjectSidebar,
  },
  setup() {
    const route = useRoute();
    const { getProjects, getProjectByKey, setCurrentProjectPage } = useProjectsStore();

    const projectKey = route.params.project;

    watch(
      () => getProjects.value,
      (newProjects) => {
        if (projectKey && newProjects) {
          setCurrentProjectPage(getProjectByKey(projectKey as string) ?? null);
        }
      },
      { immediate: true },
    );

    onUnmounted(() => {
      setCurrentProjectPage(null);
    });
  },
});
</script>

<template>
  <DefaultLayout>
    <div class="project-page">
      <ProjectSidebar />
      <div class="project-content-wrapper">
        <slot />
      </div>
    </div>
  </DefaultLayout>
</template>

<style scoped lang="scss">
$header-height: 56px;

.project-page {
  display: flex;
  height: calc(100vh - $header-height);
  overflow: hidden;

  .issue-details-content {
    padding-right: 18px;
  }
}

.project-content-wrapper {
  display: flex;
  padding-left: 24px;
  width: 100%;
  height: 100%;
}
</style>
