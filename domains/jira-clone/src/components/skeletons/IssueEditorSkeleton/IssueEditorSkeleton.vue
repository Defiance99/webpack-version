<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueEditorSkeleton',
});
</script>

<template>
  <div>
    <template v-for="(_, index) in 2" :key="index">
      <div class="issue-editor-skeleton mb-2">
        <JSkeleton
          width="85%"
          height="20px"
        />
      </div>
      <div class="issue-editor-skeleton mb-2">
        <JSkeleton
          width="100%"
          height="20px"
        />
      </div>
      <div class="issue-editor-skeleton mb-2">
        <JSkeleton
          width="75%"
          height="20px"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.issue-editor-skeleton {
  border-radius: 8px;
}
</style>
