<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JList',
});
</script>

<template>
  <div class="j-list">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.j-list {
  box-shadow: 0 0 0 0 rgb(0 0 0 / 20%), 0 0 0 0 rgb(0 0 0 / 14%), 0 0 0 0 rgb(0 0 0 / 12%);
  background: #fff;
  color: rgba(0,0,0,.87);
}
</style>
