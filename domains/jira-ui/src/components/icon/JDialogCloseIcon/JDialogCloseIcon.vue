<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JDialogCloseIcon',
});
</script>

<template>
  <div
    v-ripple
    class="j-dialog-close-icon j-hover-effect j-icon-btn"
    tabindex="0"
  >
  <JIcon
    icon="close"
    container-size
    icon-wrapper
    size="16"
    b-radius="0px"
  />
  </div>
</template>

<style lang="scss" scoped>
.j-dialog-close-icon {
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
}
</style>
