<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import PageTitle from '@/components/title/PageTitle';
import ProjectSettingsForm from '@/modules/project-settings/components/ProjectSettingsForm';

export default defineComponent({
  components: {
    PageTitle,
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
  <div class="issue-content issue-details-content">
    <AppBreadcrumbs />

    <PageTitle>
      Project Settings
    </PageTitle>

    <ProjectSettingsForm />
  </div>
</template>

<style lang="scss" scoped>
.issue-content {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  &.issue-details-content {
    flex-grow: 1;
    padding-left: 8px;
    padding-right: 32px;
  }

  &.issue-about-details-content {
    flex-basis: 400px;
    padding: 0 32px;
    min-width: 300px;
    max-width: 50vw;
  }
}

.issue-details {
  :deep(.issue-details-header) {
    margin-bottom: 0;
  }
}
</style>
