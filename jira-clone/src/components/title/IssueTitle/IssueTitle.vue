<script lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import {
  defineComponent, ref, nextTick,
} from 'vue';

export default defineComponent({
  name: 'IssueTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const issueTitleModel = ref(props.title);
    const isShowTitleEditor = ref(false);
    const titleWrapperRef = ref<HTMLDivElement | null>(null);
    const titleRef = ref<HTMLHeadingElement | null>(null);
    const editorRef = ref<HTMLTextAreaElement | null>(null);

    const setTitleEditorDisplay = (display: boolean): void => {
      isShowTitleEditor.value = display;
    };

    const setEditorHeight = (): void => {
      if (editorRef.value) {
        editorRef.value.style.height = 'auto';
        editorRef.value.style.height = `${editorRef.value.scrollHeight}px`;
      }
    };

    const showTitleEditor = (): void => {
      const titleRect = titleWrapperRef.value?.getBoundingClientRect();

      if (titleRect && editorRef.value) {
        editorRef.value.style.height = `${titleRect.height}px`;
      }

      setTitleEditorDisplay(true);

      nextTick(() => {
        editorRef.value?.focus();
        setEditorHeight();
      });
    };

    const onSaveEditorValue = (): void => {
      setTitleEditorDisplay(false);
    };

    const hideTitleEditor = (): void => {
      setTitleEditorDisplay(false);
    };

    return {
      titleWrapperRef,
      titleRef,
      editorRef,
      showTitleEditor,
      hideTitleEditor,
      isShowTitleEditor,
      onSaveEditorValue,
      issueTitleModel,
      setEditorHeight,
    };
  },
});
</script>

<template>
  <div
    v-show="isShowTitleEditor === false"
    ref="titleWrapperRef"
    class="issue-title-wrapper"
    @click="showTitleEditor"
    @blur="hideTitleEditor"
    @keypress.enter="showTitleEditor"
  >
    <h1
      ref="titleRef"
      class="issue-title"
    >
      {{ title }}
    </h1>
  </div>
  <textarea
    v-if="isShowTitleEditor"
    ref="editorRef"
    v-model="issueTitleModel"
    v-closable="{ handler: onSaveEditorValue, enable: isShowTitleEditor, exclude: titleRef }"
    rows="1"
    class="editor"
    @input="setEditorHeight"
  />
</template>

<style lang="scss" scoped>
.issue-title-wrapper {
  margin-left: -8px;
  padding: 6px 7px;
  width: 100%;
  color: var(--j-text);
  cursor: text;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: background 0.2s ease 0s;

  &:hover {
    background: #ebecf0;
  }
}

.issue-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.01em;
}

.editor {
  display: flex;
  margin-left: -8px;
  padding: 6px 7px;
  width: 100%;
  min-height: 42px;
  resize: none;
  outline: none;
  border: 1px solid var(--j-primary-color);
  border-radius: 3px;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: var(--j-text);
  overflow-y: hidden;
}
</style>
