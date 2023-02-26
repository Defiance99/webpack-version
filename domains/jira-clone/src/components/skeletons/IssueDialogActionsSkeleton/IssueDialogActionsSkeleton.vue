<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueDialogActionsSkeleton',
});
</script>

<template>
  <div class="issue-dialog-actions-skeleton">
    <div class="issue-dialog-action-skeleton">
      <JSkeleton
        width="16px"
        height="16px"
      />
    </div>
    <div class="issue-dialog-action-skeleton">
      <JSkeleton
        width="16px"
        height="16px"
      />
    </div>
    <div class="issue-dialog-action-skeleton">
      <JSkeleton
        width="16px"
        height="16px"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-dialog-actions-skeleton {
  display: flex;
  justify-content: flex-end;
}

.issue-dialog-action-skeleton {
  border-radius: 4px;
  margin-left: 12px;
}
</style>
