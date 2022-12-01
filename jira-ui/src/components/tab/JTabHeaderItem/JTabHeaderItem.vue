<script lang="ts">
import { defineComponent, computed } from 'vue';

const clickEmitName = 'change';

export default defineComponent({
  name: 'JTabHeaderItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
    activeIndex: {
      type: Object,
      required: true,
    },
  },
  emits: [clickEmitName],
  setup(props) {
    const isActive = computed(() => props.index === props.activeIndex?.value);

    return {
      clickEmitName,
      isActive,
    };
  },
});
</script>

<template>
  <div
    v-ripple
    class="j-tab-header-item"
    :class="{ active: isActive }"
    tabindex="0"
    role="tab"
    :aria-selected="isActive"
    @click="$emit(clickEmitName, index)"
    @keypress.enter="$emit(clickEmitName, index)"
    @keypress.space="$emit(clickEmitName, index)"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.j-tab-header-item {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  min-width: 90px;
  max-width: 360px;
  padding: 0 12px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    transition: .3s cubic-bezier(.25,.8,.5,1);
    background-color: currentColor;
  }

  &:hover::before {
    opacity: 0.04;
  }

  &:focus::before {
    opacity: 0.12;
  }

  &.active {
    color: #000000de;
  }
}
</style>
