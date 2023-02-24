<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Issue, IssueComment, PreviewIssue } from '@/interfaces/Issue.interface';
import ProjectPageContainer from '@/components/shared/ProjectPageContainer';
import AppBreadcrumbs from '@/components/shared/AppBreadcrumbs';
import IssueDetailsContent from '@/components/issue-parts/IssueDetailsContent';
import IssueDetailsInfo from '@/components/issue-parts/IssueDetailsInfo';
import IssueType from '@/components/issue-parts/IssueType';
import useProjectsStore from '@/composables/store/useProjectsStore';
import useFetchIssues from '@/composables/api/useFetchIssues';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useFetchComments from '@/composables/api/useFetchComments';

export default defineComponent({
  components: {
    IssueType,
    ProjectPageContainer,
    AppBreadcrumbs,
    IssueDetailsContent,
    IssueDetailsInfo,
  },
  setup() {
    const route = useRoute();
    const { project: projectKey, issue: issueId } = route.params;
    const { setNewIssue, getIssues, updateIssue } = useIssuesStore();
    const { getProjectByKey } = useProjectsStore();
    const { createComment } = useFetchComments();
    const { fetchIssueById, patchIssue } = useFetchIssues();
    const issueDetailsInfoRef = ref<HTMLDivElement | null>(null);
    const minDetailsInfoWidth = 300;

    const currentProject = computed(() => getProjectByKey(projectKey as string));

    const currentIssue = computed(() => {
      return getIssues.value.find((issue: Issue | PreviewIssue) => {
        return issue.id === +issueId && 'isDetails' in issue;
      }) as Issue | undefined;
    });

    const onUpdateIssue = async (keyName: string, value: number[] | string): Promise<void> => {
      const patchResult = await patchIssue(+issueId, keyName, value);

      if (patchResult && currentIssue.value) {
        Object.assign(currentIssue.value, patchResult);
      }
    };

    const setDetailsInfoWidth = (pageX: number): void => {
      if (issueDetailsInfoRef.value) {
        const reversePageX = window.innerWidth - pageX;
        if (reversePageX < minDetailsInfoWidth) return;

        const maxDetailsInfoWidth = window.innerWidth / 2;
        if (reversePageX > maxDetailsInfoWidth) return;

        issueDetailsInfoRef.value.style.flexBasis = `${reversePageX}px`;
      }
    };

    const initIssue = async (): Promise<void> => {
      const issue: Issue | null = await fetchIssueById(+issueId, projectKey as string);

      if (issue) {
        setNewIssue(issue);
      }
    };

    initIssue();

    const onCommentSave = async (comment: string): Promise<void> => {
      if (currentIssue.value === undefined) return;

      const newCreatedComment: IssueComment | null = await createComment(+issueId, comment);

      if (newCreatedComment && currentIssue.value) {
        const allComents = currentIssue.value.comments;
        updateIssue(+issueId, {
          comments: [...allComents, newCreatedComment],
        });
      }
    };

    return {
      currentIssue,
      currentProject,
      issueDetailsInfoRef,
      setDetailsInfoWidth,
      onCommentSave,
      onUpdateIssue,
    };
  },
});
</script>

<template>
  <ProjectPageContainer class="issue-content issue-details-content">
    <AppBreadcrumbs />

    <IssueType
      v-if="currentIssue"
      :type="currentIssue.type"
      :issue-value="currentIssue.key"
    />

    <div>
      <IssueDetailsContent
        v-if="currentIssue"
        :issue="currentIssue"
        @update:title="onUpdateIssue('name', $event)"
        @update:description="onUpdateIssue('description', $event)"
        @save:comment="onCommentSave($event)"
      />
      <JResizer
        :resize-btn="false"
        @resize="setDetailsInfoWidth"
      />
    </div>
  </ProjectPageContainer>

  <div
    ref="issueDetailsInfoRef"
    class="issue-content issue-about-details-content mt-8"
  >
    <IssueDetailsInfo
      v-if="currentProject && currentIssue"
      :issue="currentIssue"
      :project="currentProject"
      @update:status="onUpdateIssue('status', $event)"
      @update:reporter="onUpdateIssue('reporters', $event)"
      @update:assignee="onUpdateIssue('assignees', $event)"
      @update:priority="onUpdateIssue('priority', $event)"
    />
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
    max-width: 50vw;
    min-width: 300px;
  }
}

.issue-details {
  :deep(.issue-details-header) {
    margin-bottom: 0;
  }
}
</style>
