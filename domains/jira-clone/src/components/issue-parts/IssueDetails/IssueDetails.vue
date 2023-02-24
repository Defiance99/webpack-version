<script lang="ts">
import {
  defineComponent,
  PropType,
  watch,
  ref,
} from 'vue';
import { Issue, IssueComment } from '@/interfaces/Issue.interface';
import { Project } from '@/interfaces/Project.interfcace';
import IssueDetailsHeader from '@/components/issue-parts/IssueDetailsHeader';
import IssueDetailsContent from '@/components/issue-parts/IssueDetailsContent';
import IssueDetailsInfo from '@/components/issue-parts/IssueDetailsInfo';
import IssueDialogSkeleton from '@/components/skeletons/IssueDialogSkeleton';
import useFetchIssues from '@/composables/api/useFetchIssues';
import useFetchComments from '@/composables/api/useFetchComments';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';

const dialogCloseEmitName = 'close' as string;

export default defineComponent({
  name: 'IssueDetails',
  components: {
    IssueDetailsHeader,
    IssueDetailsContent,
    IssueDetailsInfo,
    IssueDialogSkeleton,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  emits: [dialogCloseEmitName],
  setup(props) {
    const { patchIssue } = useFetchIssues();
    const { createComment } = useFetchComments();
    const { fetchIssueById } = useFetchIssues();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    const issueDetails = ref<Issue | null>(null);

    const onCommentSave = async (comment: string): Promise<void> => {
      const createdComment: IssueComment | null = await createComment(props.id, comment);

      if (createdComment && issueDetails.value) {
        issueDetails.value.comments.push(createdComment);
      }
    };

    const onUpdateIssue = async (keyName: string, value: number[] | string): Promise<void> => {
      const patchResult = await patchIssue(props.id, keyName, value);

      if (patchResult && issueDetails.value) {
        Object.assign(issueDetails.value, patchResult);
      }
    };

    const watchIssueId = watch(
      () => props.id,
      async (newIssueId) => {
        startLoad();
        const issue: Issue | null = await fetchIssueById(newIssueId, props.project.key);

        if (issue) {
          issueDetails.value = issue;
        }

        stopLoad();
        watchIssueId();
      },
      {
        immediate: true,
      },
    );

    return {
      isLoad,
      issueDetails,
      onUpdateIssue,
      onCommentSave,
      dialogCloseEmitName,
    };
  },
});
</script>

<template>
  <div v-if="isLoad === false && issueDetails" class="issue-details">
    <IssueDetailsHeader
      :issue="issueDetails"
      @close="$emit(dialogCloseEmitName)"
    />

    <div class="issue-details-body">
      <IssueDetailsContent
        :issue="issueDetails"
        class="pr-10"
        @update:title="onUpdateIssue('name', $event)"
        @update:description="onUpdateIssue('description', $event)"
        @save:comment="onCommentSave($event)"
      />

      <IssueDetailsInfo
        :issue="issueDetails"
        :project="project"
        @update:status="onUpdateIssue('status', $event)"
        @update:reporter="onUpdateIssue('reporters', $event)"
        @update:assignee="onUpdateIssue('assignees', $event)"
        @update:priority="onUpdateIssue('priority', $event)"
      />
    </div>
  </div>
  <IssueDialogSkeleton v-else />
</template>

<style lang="scss" scoped>
.issue-details-body {
  display: flex;
  width: 900px;
}
</style>
