<script lang="ts">
import { defineComponent, ref } from 'vue';

const onSaveEmitName = 'update:modelValue';

export default defineComponent({
  name: 'IssueTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const issueTitleModel = ref<string>(props.title);
    const isShowTitleEditor = ref<boolean>(false);
    const titleRef = ref<HTMLHeadingElement | null>(null);

    const setTitleEditorDisplay = (display: boolean): void => {
      isShowTitleEditor.value = display;
    };

    const showTitleEditor = (): void => {
      setTitleEditorDisplay(true);
    };

    const onSaveEditorValue = (): void => {
      if (props.title !== issueTitleModel.value) {
        emit(onSaveEmitName, issueTitleModel.value);
      }
      setTitleEditorDisplay(false);
    };

    return {
      titleRef,
      showTitleEditor,
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
    class="issue-title-wrapper"
    @click="showTitleEditor"
    @keypress.enter="showTitleEditor"
  >
    <h1
      ref="titleRef"
      class="issue-title"
    >
      {{ issueTitleModel }}
    </h1>
  </div>
  <JTextarea
    v-if="isShowTitleEditor"
    v-model="issueTitleModel"
    v-closable="{ handler: onSaveEditorValue, exclude: titleRef }"
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
  min-height: 42px;
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
