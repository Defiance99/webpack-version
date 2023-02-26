<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueKeySkeleton',
});
</script>

<template>
  <div class="issue-key-skeleton">
    <JSkeleton
      width="75px"
      height="24px"
    />
  </div>
</template>

<style lang="scss" scoped>
.issue-key-skeleton {
  border-radius: 8px;
}
</style>
