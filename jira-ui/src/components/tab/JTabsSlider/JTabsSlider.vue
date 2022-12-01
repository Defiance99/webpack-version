<script lang="ts">
import { defineProps } from 'vue';

export default {
  name: 'JTabsSlider',
};
</script>

<script setup lang="ts">
const props = defineProps({
  offsetX: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="j-tabs-slider" />
</template>

<style scoped lang="scss">
@import './_variables.scss';

.j-tabs-slider {
  display: flex;
  position: relative;
  will-change: left;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    transition: $j-tabs-slider-animation;
    background-color: var(--j-primary-color);
  }
}
</style>

<style scoped>
.j-tabs-slider::before {
  left: v-bind(props.offsetX);
  width: v-bind(props.width);
}
</style>
