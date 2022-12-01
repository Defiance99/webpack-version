<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import type { PropType } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import IssueTitle from '@/components/title/IssueTitle';
import CommentsList from '@/components/list/CommentsList';

export default defineComponent({
  name: 'IssueDetailsContent',
  components: {
    IssueTitle,
    CommentsList,
    WEditor: defineAsyncComponent(() => import('wysiwyg/WEditor')),
  },
  props: {
    issue: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="issue-details-content">
    <IssueTitle :title="issue.name" />

    <h4 class="text-subtitle-4 block-label">
      Description
    </h4>

    <WEditor
      v-model="test"
      class="mb-4"
    />

    <h4 class="text-subtitle-4 block-label">
      Comments
    </h4>

    <CommentsList class="mt-5" />
  </div>
</template>

<style lang="scss" scoped>
.issue-details-content {
  max-width: 600px;
  width: 100%;
}

.block-label {
  margin-top: 12px;
  margin-bottom: 16px;
  color: var(--j-text);
}
</style>
