<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Issue, IssueComment, PreviewIssue } from '@/interfaces/Issue.interface';
import IssueTitleSkeleton from '@/components/skeletons/IssueTitleSkeleton';
import IssueKeySkeleton from '@/components/skeletons/IssueKeySkeleton';
import IssueEditorSkeleton from '@/components/skeletons/IssueEditorSkeleton';
import IssueSidebarSkeleton from '@/components/skeletons/IssueSidebarSkeleton';
import CommentSkeleton from '@/components/skeletons/CommentSkeleton';
import ProjectPageContainer from '@/components/shared/ProjectPageContainer';
import AppBreadcrumbs from '@/components/shared/AppBreadcrumbs';
import IssueDetailsContent from '@/components/issue-parts/IssueDetailsContent';
import IssueDetailsInfo from '@/components/issue-parts/IssueDetailsInfo';
import IssueType from '@/components/issue-parts/IssueType';
import useProjectsStore from '@/composables/store/useProjectsStore';
import useFetchIssues from '@/composables/api/useFetchIssues';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useFetchComments from '@/composables/api/useFetchComments';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';

export default defineComponent({
  components: {
    IssueTitleSkeleton,
    IssueSidebarSkeleton,
    IssueKeySkeleton,
    IssueEditorSkeleton,
    CommentSkeleton,
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
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
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
      startLoad();
      const issue: Issue | null = await fetchIssueById(+issueId, projectKey as string);

      if (issue) {
        setNewIssue(issue);
      }

      stopLoad();
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
      isLoad,
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
  <ProjectPageContainer class="issue-content">
    <AppBreadcrumbs />

    <IssueType
      v-if="currentIssue && isLoad === false"
      :type="currentIssue.type"
      :issue-value="currentIssue.key"
    />
    <IssueKeySkeleton v-else class="mb-4" />

    <div>
      <IssueDetailsContent
        v-if="currentIssue && isLoad === false "
        :issue="currentIssue"
        @update:title="onUpdateIssue('name', $event)"
        @update:description="onUpdateIssue('description', $event)"
        @save:comment="onCommentSave($event)"
      />
      <template v-else>
        <IssueTitleSkeleton class="mb-6" />
        <IssueEditorSkeleton class="mb-10" />
        <CommentSkeleton />
      </template>
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
      v-if="currentProject && currentIssue && isLoad === false"
      :issue="currentIssue"
      :project="currentProject"
      @update:status="onUpdateIssue('status', $event)"
      @update:reporter="onUpdateIssue('reporters', $event)"
      @update:assignee="onUpdateIssue('assignees', $event)"
      @update:priority="onUpdateIssue('priority', $event)"
    />
    <IssueSidebarSkeleton v-else />
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

.issue-details-content {
  max-width: 100%;
}

.issue-details {
  :deep(.issue-details-header) {
    margin-bottom: 0;
  }
}
</style>
