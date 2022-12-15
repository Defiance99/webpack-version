<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import IssueDialogHeader from '@/components/shared/IssueDialogHeader';
import IssueDetailsContent from '@/components/shared/IssueDetailsContent';
import IssueAboutDetailsGroup from '@/components/shared/IssueAboutDetailsGroup';

const emitDialogCloseName = 'close';

export default defineComponent({
  name: 'IssueDetails',
  components: {
    IssueDialogHeader,
    IssueDetailsContent,
    IssueAboutDetailsGroup,
  },
  props: {
    issue: {
      type: Object as PropType<IssueInfo>,
      required: true,
    },
  },
  emits: [emitDialogCloseName],
  setup() {
    return {
      emitDialogCloseName,
    };
  },
});
</script>

<template>
  <div class="issue-details">
    <IssueDialogHeader
      :issue="issue"
      @close="$emit(emitDialogCloseName)"
    />

    <div class="issue-details-body">
      <IssueDetailsContent
        :issue="issue"
        class="pr-10"
      />

      <IssueAboutDetailsGroup />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-details-body {
  display: flex;
  width: 900px;
}
</style>
