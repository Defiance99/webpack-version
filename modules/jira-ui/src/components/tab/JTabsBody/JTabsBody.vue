<script lang="ts">
import {
  defineComponent, useCssModule, h, ref, VNode, watch,
} from 'vue';

export default defineComponent({
  name: 'JTabsBody',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    const classes = useCssModule('classes');
    const isReversed = ref(false);
    const slotsItems = ref(slots.default?.());

    watch(() => props.modelValue, (newVal: number, oldVal: number): void => {
      isReversed.value = newVal < oldVal;
    });

    return () => h(
      'div',
      { class: classes['j-tabs-body'] },
      slotsItems.value?.map(
        (tabItem: VNode, index: number) => h(
          tabItem,
          {
            key: index,
            index,
            activeIndex: props.modelValue,
            reverse: isReversed.value,
          },
        ),
      ),
    );
  },
});
</script>

<style module="classes" lang="scss">
.j-tabs-body {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: inherit;
  transition: 600ms ease-in;
}
</style>
