<script lang="ts">
import {
  useSlots,
  h, defineEmits, defineProps, computed, useCssModule, ref, nextTick, VNode,
} from 'vue';
import { parseNodes } from '@/composables/utils/useParseNodes';
import JTabHeaderItem from '@/components/tab/JTabHeaderItem';

export default {
  name: 'JTabsHeader',
};
</script>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});

const inputEmitName = 'update:modelValue';
const emit = defineEmits<{(e: typeof inputEmitName, id: number): void }>();

const slots = useSlots();
const slotItems = slots.default?.();
const tabItems: VNode[] = parseNodes(slotItems, JTabHeaderItem.name);
const jtabsRef = ref< HTMLElement | null>(null);
const sliderStyles = ref<{ width: string; offsetLeft: number }>({
  width: '',
  offsetLeft: 0,
});

const currentActiveIndex = computed(() => props.modelValue);

const classes = useCssModule('classes');

const setSliderStyles = () => {
  nextTick(() => {
    const activeTab: HTMLElement | undefined | null = jtabsRef.value?.querySelector('.j-tab-header-item.active');

    if (activeTab) {
      sliderStyles.value.width = window.getComputedStyle(activeTab).width;
      sliderStyles.value.offsetLeft = activeTab.offsetLeft;
    }
  });
};

setSliderStyles();

const onChangeTab = (tabIndex: number): void => {
  emit(inputEmitName, tabIndex);
  setSliderStyles();
};

const renderTabsItems = h(
  'div',
  { class: classes['j-tabs-header'] },
  tabItems.map((tabItem, index) => h(tabItem, {
    key: index,
    onChange: onChangeTab,
    index,
    activeIndex: currentActiveIndex,
  })),
);
</script>

<template>
  <div class="j-tabs-wrapper">
    <renderTabsItems ref="jtabsRef" />

    <JTabsSlider
      :offset-x="`${sliderStyles.offsetLeft}px`"
      :width="sliderStyles.width"
    />
  </div>
</template>

<style scoped lang="scss">
.j-tabs-wrapper {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: rgb(235, 236, 240);
  }
}
</style>

<style module="classes" lang="scss">
.j-tabs-header {
  display: flex;
  position: relative;
  height: 38px;
}
</style>
