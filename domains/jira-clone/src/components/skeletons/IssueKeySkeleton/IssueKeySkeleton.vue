<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueKeySkeleton',
});
</script>

<template>
  <JSkeleton
    width="75px"
    height="24px"
    class="issue-key-skeleton"
  />
</template>

<style lang="scss" scoped>
.issue-key-skeleton {
  border-radius: 8px;
}
</style>
