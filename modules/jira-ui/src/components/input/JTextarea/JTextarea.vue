<script lang="ts">
import {
  computed, defineComponent, nextTick, onMounted, ref,
} from 'vue';

const inputEmitName = 'update:modelValue';

export default defineComponent({
  name: 'JTextarea',
  props: {
    autoHeight: {
      type: Boolean,
      default: true,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: [inputEmitName],
  setup(props, { emit }) {
    const textareaRef = ref<HTMLTextAreaElement | null>(null);

    const textareaModel = computed({
      set(value) {
        emit(inputEmitName, value);
      },
      get() {
        return props.modelValue;
      },
    });

    const setEditorHeight = async (): Promise<void> => {
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
      }
    };

    onMounted(() => {
      setEditorHeight();

      nextTick(() => {
        if (props.autoFocus) {
          textareaRef.value?.focus();
        }
      });
    });

    return {
      textareaRef,
      textareaModel,
      setEditorHeight,
    };
  },
});
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="textareaModel"
    v-bind="{ ...$attrs }"
    class="j-textarea"
    @input="setEditorHeight"
  />
</template>

<style lang="scss" scoped>
.j-textarea {
  padding: 12px 16px;
  width: 100%;
  resize: none;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  outline: none;
  overflow-y: hidden;

  &:focus {
    border: 1px var(--j-primary-color) solid;
  }
}
</style>
