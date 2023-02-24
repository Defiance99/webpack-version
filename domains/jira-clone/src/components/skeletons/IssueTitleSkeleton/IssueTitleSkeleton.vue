<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IssueTitleSkeleton',
});
</script>

<template>
  <JSkeleton
    width="100%"
    height="42px"
    class="issue-key-skeleton"
  />
</template>

<style lang="scss" scoped>
.issue-key-skeleton {
  border-radius: 8px;
}
</style>
