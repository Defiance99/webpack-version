<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueSidebarSkeleton',
});
</script>

<template>
  <div class="issue-sidebar-skeleton">
    <JSkeleton
      width="80px"
      height="16px"
      class="mb-1"
    />
    <JSkeleton
      width="100%"
      height="30px"
      class="mb-5"
    />
    <JSkeleton
      width="80px"
      height="16px"
      class="mb-1"
    />
    <JSkeleton
      width="100%"
      height="30px"
      class="mb-5"
    />
    <JSkeleton
      width="80px"
      height="16px"
      class="mb-1"
    />
    <JSkeleton
      width="100%"
      height="30px"
      class="mb-5"
    />
    <JSkeleton
      width="190px"
      height="14px"
      class="mb-1"
    />
    <JSkeleton
      width="190px"
      height="14px"
      class="mb-1"
    />
  </div>
</template>

<style lang="scss" scoped>
.issue-sidebar-skeleton {
  border-radius: 8px;
}
</style>
