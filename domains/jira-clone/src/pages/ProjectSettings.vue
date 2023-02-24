<script lang="ts">
import { defineComponent } from 'vue';
import ProjectPageContainer from '@/components/shared/ProjectPageContainer';
import AppBreadcrumbs from '@/components/shared/AppBreadcrumbs';
import PageTitle from '@/components/title/PageTitle';
import ProjectSettingsForm from '@/modules/project-settings/components/ProjectSettingsForm';
import useProjectsStore from '@/composables/store/useProjectsStore';

export default defineComponent({
  components: {
    PageTitle,
    ProjectPageContainer,
    AppBreadcrumbs,
    ProjectSettingsForm,
  },
  setup() {
    const { getCurrentProjectPage } = useProjectsStore();

    return {
      getCurrentProjectPage,
    };
  },
});
</script>

<template>
  <ProjectPageContainer class="project-settings">
    <AppBreadcrumbs />

    <PageTitle>
      Project Settings
    </PageTitle>

    <ProjectSettingsForm
      v-if="getCurrentProjectPage"
      :project="getCurrentProjectPage"
    />
  </ProjectPageContainer>
</template>
