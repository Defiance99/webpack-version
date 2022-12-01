<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogTitle',
});
</script>

<template>
  <h1 class="dialog-title">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.dialog-title {
  font-size: 20px;
  font-weight: 400;
  color: var(--j-text);
}
</style>
