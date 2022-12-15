<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layouts/default.vue';
import ProjectSidebar from '@/components/ProjectSidebar';

export default defineComponent({
  name: 'ProjectLayout',
  components: {
    DefaultLayout,
    ProjectSidebar,
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
