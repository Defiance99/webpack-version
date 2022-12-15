<script lang="ts">
export default {
  name: 'JOverlayRoot',
};
</script>

<template>
  <div id="j-overlay-container" />
</template>

<style scoped lang="scss">
#j-overlay-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
