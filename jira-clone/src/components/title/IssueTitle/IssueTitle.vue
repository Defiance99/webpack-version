<script lang="ts">
import { defineComponent, ref } from 'vue';

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

    const setTitleEditorDisplay = (display: boolean): void => {
      isShowTitleEditor.value = display;
    };

    const showTitleEditor = (): void => {
      setTitleEditorDisplay(true);
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
      showTitleEditor,
      hideTitleEditor,
      isShowTitleEditor,
      onSaveEditorValue,
      issueTitleModel,
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
  <JTextarea
    v-if="isShowTitleEditor"
    v-model="issueTitleModel"
    v-closable="{ handler: onSaveEditorValue, enable: isShowTitleEditor, exclude: titleRef }"
    auto-focus
    rows="1"
    class="editor"
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
