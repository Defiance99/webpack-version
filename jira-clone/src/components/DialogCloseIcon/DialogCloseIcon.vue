<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DialogCloseIcon',
});
</script>

<template>
  <div
    v-ripple
    class="dialog-close-icon hover-effect"
  >
    <span class="icon-wrapper">
      <JIcon
        icon="close"
        container-size
      />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.dialog-close-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 5px;
  color: var(--j-text-subtitle);
  overflow: hidden;

  .icon-wrapper {
    display: flex;
    width: 16px;
    height: 16px;
  }
}
</style>
