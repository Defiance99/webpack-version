<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProjectPageContainer from '@/components/ProjectPageContainer';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import IssueDetailsContent from '@/components/shared/IssueDetailsContent';
import IssueDetailsInfo from '@/components/shared/IssueDetailsInfo';
import IssueType from '@/components/shared/IssueType';

export default defineComponent({
  components: {
    IssueType,
    ProjectPageContainer,
    AppBreadcrumbs,
    IssueDetailsContent,
    IssueDetailsInfo,
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
  <ProjectPageContainer class="issue-content issue-details-content">
    <AppBreadcrumbs />

    <IssueType
      :id="issue.number"
      :type="issue.type"
    />

    <div>
      <IssueDetailsContent :issue="issue" />
      <JResizer
        :resize-btn="false"
        @click="toggleSidebarType"
        @resize="setAboutDetailsContentWidth"
      />
    </div>
  </ProjectPageContainer>

  <div
    ref="issueAboutDetailsRef"
    class="issue-content issue-about-details-content mt-8"
  >
    <IssueDetailsInfo />
  </div>
</template>

<style lang="scss" scoped>
.issue-content {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

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
