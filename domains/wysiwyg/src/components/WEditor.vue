<script setup lang="ts">
import {
  ref,
  defineProps,
  computed,
  provide,
  defineEmits,
  watch,
  onMounted,
} from 'vue';
import WToolbar from './WToolbar.vue';

const inputEmitName = 'update:modelValue';
const defaultModulesList: string[] = [
  'WBold',
  'WCode',
  'WItalic',
  'WUnderline',
];

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  hiddenModules: {
    type: Array,
    default: () => [],
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{ (e: string, value: string): void }>();

const currentRanges = ref<Range[]>([]);
const contentRef = ref<HTMLDivElement | null>(null);

const currentModules = computed(() =>
  defaultModulesList.filter(
    (defaultModule: string) => !props.hiddenModules.includes(defaultModule)
  )
);

const setHTML = (html: string): void => {
  if (contentRef.value) {
    contentRef.value.innerHTML = html;
  }
};

const onChangeHTML = (): void => {
  emit(inputEmitName, contentRef.value?.innerHTML ?? '');
};

const resetRanges = (): void => {
  currentRanges.value = [];
};

const execute = (action: string): void => {
  currentRanges.value.forEach((range: Range) => {
    range.surroundContents(document.createElement(action));
    onChangeHTML();
  });
};

const onSelectionChange = (): void => {
  resetRanges();

  const selection: Selection | null = document.getSelection();

  if (selection === null) return;

  for (let i = 0; i < selection.rangeCount; i += 1) {
    currentRanges.value.push(selection.getRangeAt(i));
  }
};

const onFocus = (): void => {
  document.addEventListener('selectionchange', onSelectionChange);
};

const onBlur = (): void => {
  document.removeEventListener('selectionchange', onSelectionChange);
};

onMounted(() => {
  setTimeout(() => {
    if (props.autoFocus) {
      contentRef.value?.focus();
    }
  });

  watch(
    () => props.modelValue,
    (newHTML: string) => {
      setHTML(newHTML);
    },
    { immediate: true }
  );
});

provide('exec', execute);
</script>

<template>
  <div class="w-editor">
    <WToolbar :modules="currentModules" />

    <div
      ref="contentRef"
      class="w-editor-content"
      contenteditable="true"
      @focus="onFocus"
      @blur="onBlur"
      @input="onChangeHTML"
    />
  </div>
</template>

<style lang="scss" scoped>
.w-editor-content {
  padding: 10px;
  border-radius: 0 0 4px 4px;
  border: 1px solid #dfe1e6;
  border-top: none;
  outline: none;
}
</style>
