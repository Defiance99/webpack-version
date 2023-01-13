<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import IssueTitle from '@/components/title/IssueTitle';
import IssueEditor from '@/components/shared/IssueEditor';
import CommentsList from '@/components/list/CommentsList';

const onTitleChangeEmitName = 'update:title';
const onDescriptionChangeEmitName = 'update:description';
const onCommensSaveEmitName = 'save:comment';

export default defineComponent({
  name: 'IssueDetailsContent',
  components: {
    IssueTitle,
    IssueEditor,
    CommentsList,
  },
  props: {
    issue: {
      type: Object as PropType<Issue>,
      required: true,
    },
  },
  setup() {
    return {
      onTitleChangeEmitName,
      onDescriptionChangeEmitName,
      onCommensSaveEmitName,
    };
  },
});
</script>

<template>
  <div class="issue-details-content">
    <IssueTitle
      :title="issue.name"
      @update:modelValue="$emit(onTitleChangeEmitName, $event)"
    />

    <h4 class="text-subtitle-4 block-label">
      Description
    </h4>

    <IssueEditor
      :html="issue.description"
      offset
      class="mb-10 issue-description-container"
      @save="$emit(onDescriptionChangeEmitName, $event)"
    />

    <h4 class="text-subtitle-4 block-label comment-label">
      Comments
    </h4>

    <CommentsList
      :comments="issue.comments"
      @save="$emit(onCommensSaveEmitName, $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
.issue-details-content {
  max-width: 600px;
  width: 100%;
}

.block-label {
  margin-top: 12px;
  margin-bottom: 4px;
  font-weight: 600;
  color: var(--j-text);

  &.comment-label {
    margin-bottom: 8px;
  }
}

.issue-description-container {
  :deep(.issue-editor) {
    min-height: 100px;
  }
}
</style>
