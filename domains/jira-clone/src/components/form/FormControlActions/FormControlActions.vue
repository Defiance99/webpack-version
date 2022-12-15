<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormControlActions',
  props: {
    flexEnd: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div
    class="form-control-actions"
    :class="{ end: flexEnd }"
  >
    <JButton type="normal">
      Cancel
    </JButton>

    <JButton class="ml-2">
      Create
    </JButton>
  </div>
</template>

<style lang="scss" scoped>
.form-control-actions {
  display: flex;

  &.end {
    justify-content: flex-end;
  }
}
</style>
