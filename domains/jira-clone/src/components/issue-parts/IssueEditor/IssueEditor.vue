<script lang="ts">
import {
  defineComponent,
  ref,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
} from 'vue';
import FormControlActions from '@/components/form/FormControlActions';

const onSaveEmitName = 'save';

export default defineComponent({
  name: 'IssueEditor',
  components: {
    WEditor: defineAsyncComponent(() => import('wysiwyg/WEditor')),
    FormControlActions,
  },
  props: {
    html: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    offset: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    mFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const issueEditorModel = ref<string>(props.html);
    const isShowContentEditor = ref<boolean>(false);
    const previewContentRef = ref<HTMLDivElement | null>(null);

    const setHtmlValue = (value: string): void => {
      issueEditorModel.value = value;
    };

    const setPreviewContentDisplay = (display: boolean): void => {
      isShowContentEditor.value = display;
    };

    const showPreviewEditor = (): void => {
      setPreviewContentDisplay(true);
    };

    const saveEditorValue = (): void => {
      if (props.html !== issueEditorModel.value) {
        emit(onSaveEmitName, issueEditorModel.value);
      }

      setPreviewContentDisplay(false);
    };

    const mFocusEvent = (event: KeyboardEvent): void => {
      if (event.key === 'm') {
        showPreviewEditor();
      }
    };

    onMounted(() => {
      if (props.mFocus) {
        document.addEventListener('keypress', mFocusEvent);
      }
    });

    onUnmounted(() => {
      document.removeEventListener('keypress', mFocusEvent);
    });

    return {
      previewContentRef,
      showPreviewEditor,
      setPreviewContentDisplay,
      setHtmlValue,
      isShowContentEditor,
      saveEditorValue,
    };
  },
});
</script>

<template>
  <div class="issue-editor-wrapper">
    <div
      v-show="isShowContentEditor === false"
      class="issue-editor"
      :class="{ offset, border }"
      ref="previewContentRef"
      tabindex="0"
      @click="showPreviewEditor"
      @keypress.enter="showPreviewEditor"
    >
      <div v-if="placeholder">
        {{ placeholder }}
      </div>
      <div v-else v-html="html" />
    </div>
    <WEditor
      v-if="isShowContentEditor"
      :modelValue="html"
      auto-focus
      class="mb-4"
      @update:modelValue="setHtmlValue"
    />
    <FormControlActions
      v-if="isShowContentEditor"
      direction-reverse
      class="mb-3"
      @click:cancel="setPreviewContentDisplay(false)"
      @click:confirm="saveEditorValue"
    >
      <template #cancel>
        Cancel
      </template>
      <template #confirm>
        Save
      </template>
    </FormControlActions>
  </div>
  <div v-if="mFocus">
    <strong>
      Pro tip:
    </strong>
    press
    <span class="comment-hot-key-tip">
      M
    </span>
    to comment
  </div>
</template>

<style lang="scss" scoped>
.issue-editor {
  padding: 10px 7px;
  width: 100%;
  color: var(--j-text);
  cursor: text;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: background 0.2s ease 0s;

  &.offset {
    margin-left: -8px;
  }

  &.border {
    border: 1px solid #dfe1e6;
  }

  &:hover {
    background: #ebecf0;
  }
}

.comment-hot-key-tip {
  display: inline-block;
  padding: 3px 4px 3px;
  max-width: 100%;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  color: var(--j-text-subtitle);
  border-radius: 3px;
  background-color: #DFE1E6;
}

.j-textarea {
  &:hover:not(&:focus) {
    background: #ebecf0;
  }
}
</style>
