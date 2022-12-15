<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormControl',
  props: {
    last: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div
    class="form-control"
    :class="{ last }"
  >
    <div class="form-input-label">
      <slot name="label" />
    </div>
    <div class="form-control-item">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-control {
  position: relative;
  margin-bottom: 12px;

  &.last {
    margin-bottom: 24px;
  }
}

.form-input-label {
  display: block;
  margin-bottom: 4px;
  color: #6B778C;
  font-size: 14px;
}
</style>
