<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JTabBodyItem',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <Transition name="j-transition">
    <div
      v-show="activeIndex === index"
      role="tabpanel"
      class="j-tab-body-item"
      :class="{ reverse }"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.j-transition-enter-active,
.j-transition-leave-active,
.reverse.j-transition-enter-active,
.reverse.j-transition-leave-active {
  transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.j-transition-leave-from,
.j-transition-leave-to,
.reverse.j-transition-leave-from,
.reverse.j-transition-leave-to {
  position: absolute !important;
  top: 0;
  width: 100%;
}
.j-transition-enter-from {
  transform: translateX(100%);
}
.j-transition-leave-to {
  transform: translateX(-100%);
}
.reverse.j-transition-enter-from {
  transform: translateX(-100%);
}
.reverse.j-transition-leave-to {
  transform: translateX(100%);
}
</style>
