<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageTitle',
});
</script>

<template>
  <h1 class="page-title text-subtitle-1">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.page-title {
  color: var(--j-text-subtitle);
  margin-bottom: 24px;
}
</style>
