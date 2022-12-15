<script lang="ts">
import {
  defineComponent, onMounted, onUnmounted, ref, watch,
} from 'vue';
import useFocusTrapsStore from '@/composables/store/useFocusTrapsStore';

export default defineComponent({
  name: 'JFocusTrap',
  props: {
    value: {
      type: Boolean,
      default: null,
    },
  },
  setup(props) {
    const { addFocusTrap, removeLastFocusTrap } = useFocusTrapsStore();
    const focusTrapRef = ref<HTMLDivElement | null>(null);

    watch(() => props.value, (newValue: boolean): void => {
      if (focusTrapRef.value && newValue) {
        addFocusTrap(focusTrapRef.value);
      } else {
        removeLastFocusTrap();
      }
    });

    onMounted(() => {
      if (focusTrapRef.value && props.value === null) {
        addFocusTrap(focusTrapRef.value);
      }
    });

    onUnmounted(() => {
      if (props.value === null) {
        removeLastFocusTrap();
      }
    });

    return {
      focusTrapRef,
    };
  },
});
</script>

<template>
  <div
    ref="focusTrapRef"
    tabindex="0"
    aria-hidden="true"
    class="j-focus-trap-anchor"
  />
</template>

<style lang="scss" scoped>
.j-focus-trap-anchor {
  position: absolute;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
  border: 0;
  overflow: hidden;
}
</style>
