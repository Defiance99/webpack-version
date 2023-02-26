<script lang="ts">
import { defineComponent } from 'vue';
import IssueTitleSkeleton from '@/components/skeletons/IssueTitleSkeleton';
import IssueSidebarSkeleton from '@/components/skeletons/IssueSidebarSkeleton';
import IssueEditorSkeleton from '@/components/skeletons/IssueEditorSkeleton';
import IssueKeySkeleton from '@/components/skeletons/IssueKeySkeleton';
import IssueDialogActionsSkeleton from '@/components/skeletons/IssueDialogActionsSkeleton';
import CommentSkeleton from '@/components/skeletons/CommentSkeleton';

export default defineComponent({
  name: 'IssueDialogSkeleton',
  components: {
    IssueTitleSkeleton,
    IssueSidebarSkeleton,
    IssueEditorSkeleton,
    IssueKeySkeleton,
    IssueDialogActionsSkeleton,
    CommentSkeleton,
  },
});
</script>

<template>
  <div class="issue-dialog-skeleton pb-6">
    <div class="issue-dialog-body-skeleton pr-10">
      <IssueKeySkeleton class="mb-4" />
      <IssueTitleSkeleton class="mb-6" />
      <IssueEditorSkeleton class="mb-10" />
      <CommentSkeleton />
    </div>
    <div class="issue-dialog-sidebar-skeleton">
      <IssueDialogActionsSkeleton class="mb-4" />
      <IssueSidebarSkeleton />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-dialog-skeleton {
  display: flex;
  width: 900px;
}

.issue-dialog-body-skeleton {
  max-width: 600px;
  width: 100%;
}

.issue-dialog-sidebar-skeleton {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
