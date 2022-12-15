<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectPageContainer',
});
</script>

<template>
  <div class="project-page-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.project-page-container {
  --project-page-padding-left: 8px;

  flex-grow: 1;
  padding-right: 32px;
  padding-left: var(--project-page-padding-left);
}
</style>
