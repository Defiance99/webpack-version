<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import { Project } from '@/interfaces/Project.interfcace';
import IssueDialogHeader from '@/components/shared/IssueDialogHeader';
import IssueDetailsContent from '@/components/shared/IssueDetailsContent';
import IssueDetailsInfo from '@/components/shared/IssueDetailsInfo';
import useFetchIssues from '@/composables/useFetchIssues';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useFetchComments from '@/composables/useFetchComments';

const dialogCloseEmitName = 'close' as string;

export default defineComponent({
  name: 'IssueDetails',
  components: {
    IssueDialogHeader,
    IssueDetailsContent,
    IssueDetailsInfo,
  },
  props: {
    issue: {
      type: Object as PropType<Issue>,
      required: true,
    },
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  emits: [dialogCloseEmitName],
  setup(props) {
    const { setNewIssue } = useIssuesStore();
    const { updateIssue } = useFetchIssues();
    const { createComment } = useFetchComments();

    const onIssueChange = async (id: number | undefined, keyName: string, value: number[] | string): Promise<void> => {
      if (id === undefined) return;

      const updatedIssue: Issue | null = await updateIssue({
        id,
        [keyName]: Array.isArray(value) ? [...value] : value,
      });

      if (updatedIssue) {
        setNewIssue(updatedIssue);
      }
    };

    const onCommentSave = (comment: string): void => {
      createComment(props.issue.id, comment);
    };

    return {
      onIssueChange,
      onCommentSave,
      dialogCloseEmitName,
    };
  },
});
</script>

<template>
  <div v-if="project" class="issue-details">
    <IssueDialogHeader
      :issue="issue"
      @close="$emit(dialogCloseEmitName)"
    />

    <div class="issue-details-body">
      <IssueDetailsContent
        :issue="issue"
        class="pr-10"
        @update:title="onIssueChange(issue?.id, 'name', $event)"
        @update:description="onIssueChange(issue?.id, 'description', $event)"
        @save:comment="onCommentSave($event)"
      />

      <IssueDetailsInfo
        :issue="issue"
        :project="project"
        @update:status="onIssueChange(issue?.id, 'status', $event)"
        @update:reporter="onIssueChange(issue?.id,'reporters', $event)"
        @update:assignee="onIssueChange(issue?.id,'assignees', $event)"
        @update:priority="onIssueChange(issue?.id,'priority', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-details-body {
  display: flex;
  width: 900px;
}
</style>
