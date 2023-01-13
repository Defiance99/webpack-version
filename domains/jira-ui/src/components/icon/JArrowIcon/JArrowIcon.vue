<script lang="ts">
export default {
  name: 'JArrowIcon',
  props: {
    margin: {
      type: Boolean,
      default: true,
    },
    containerSize: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <JIcon
    icon="downArrow"
    :class="{ 'container-size': containerSize, margin, active }"
  />
</template>

<style lang="scss" scoped>
.margin {
  margin-right: -8px;
  margin-left: -8px;
  transform-origin: center;
  transition: all 150ms ease-in-out;

  &.active {
    transform: rotate(180deg);
  }
}
</style>
