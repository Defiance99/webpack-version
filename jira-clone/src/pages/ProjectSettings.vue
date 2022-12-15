<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProjectPageContainer from '@/components/ProjectPageContainer';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import PageTitle from '@/components/title/PageTitle';
import ProjectSettingsForm from '@/modules/project-settings/components/ProjectSettingsForm';

export default defineComponent({
  components: {
    PageTitle,
    ProjectPageContainer,
    AppBreadcrumbs,
    ProjectSettingsForm,
  },
  setup() {
    const issueAboutDetailsRef = ref<HTMLDivElement | null>(null);
    const minWidth = 300;
    const issue = {
      id: 1,
      project: 1,
      name: 'Задача по устранению интеграции с банком',
      type: 'task',
      number: 'MP-104',
    };

    const setAboutDetailsContentWidth = (pageX: number): void => {
      if (issueAboutDetailsRef.value) {
        const reversePageX = window.innerWidth - pageX;
        if (reversePageX < minWidth) return;

        const maxWidth = window.innerWidth / 2;
        if (reversePageX > maxWidth) return;

        issueAboutDetailsRef.value.style.flexBasis = `${reversePageX}px`;
      }
    };

    return {
      issue,
      issueAboutDetailsRef,
      setAboutDetailsContentWidth,
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

    <ProjectSettingsForm />
  </ProjectPageContainer>
</template>
