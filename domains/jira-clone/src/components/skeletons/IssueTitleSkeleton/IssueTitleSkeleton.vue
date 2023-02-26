<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueTitleSkeleton',
});
</script>

<template>
  <div class="issue-title-skeleton">
    <JSkeleton
      width="100%"
      height="38px"
    />
  </div>
</template>

<style lang="scss" scoped>
.issue-title-skeleton {
  border-radius: 8px;
}
</style>
