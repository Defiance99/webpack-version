<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormControlActions from '@/components/form/FormControlActions';

const onSaveEmitName = 'update:modelValue';

export default defineComponent({
  name: 'IssueTitle',
  components: {
    FormControlActions,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const issueEditorModel = ref<string>(props.title);
    const isShowTitleEditor = ref<boolean>(false);
    const titleRef = ref<HTMLHeadingElement | null>(null);

    const setTitleEditorDisplay = (display: boolean): void => {
      isShowTitleEditor.value = display;
    };

    const showTitleEditor = (): void => {
      setTitleEditorDisplay(true);
    };

    const onCancelTitleEditor = (): void => {
      issueEditorModel.value = props.title;
      setTitleEditorDisplay(false);
    };

    const onSaveEditorValue = (): void => {
      if (props.title !== issueEditorModel.value) {
        emit(onSaveEmitName, issueEditorModel.value);
      }

      setTitleEditorDisplay(false);
    };

    return {
      titleRef,
      issueEditorModel,
      showTitleEditor,
      isShowTitleEditor,
      onSaveEditorValue,
      onCancelTitleEditor,
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
      {{ title }}
    </h1>
  </div>
  <JTextarea
    v-if="isShowTitleEditor"
    v-model="issueEditorModel"
    v-closable="{ handler: onCancelTitleEditor, exclude: titleRef }"
    auto-focus
    rows="1"
    class="editor"
  />
  <FormControlActions
    v-if="isShowTitleEditor"
    direction-reverse
    class="mt-2"
    @click:cancel="onCancelTitleEditor"
    @click:confirm="onSaveEditorValue "
  >
    <template #cancel> Cancel </template>
    <template #confirm> Save </template>
  </FormControlActions>
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
