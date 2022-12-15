<script lang='ts'>
export default {
  name: 'JSemanticButton',
};
</script>

<template>
  <button class="j-semantic-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.j-semantic-button {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  background: unset;
  border: unset;
  color: inherit;
}
</style>
