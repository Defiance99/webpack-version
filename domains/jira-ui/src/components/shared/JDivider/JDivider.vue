<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JDivider',
  props: {
    type: {
      type: String,
      default: 'horizontal',
      validator: (value: string): boolean => ['horizontal'].includes(value),
    },
  },
});
</script>

<template>
  <div
    class="j-divider"
    :class="{ type }"
  />
</template>

<style lang="scss" scoped>
.j-divider {
  margin: 16px 0;
  height: 2px;
  background-color: #C1C7D0;
}
</style>
