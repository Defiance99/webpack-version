<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PriorityTypes } from '@/types/PriorityTypes';

const onSelectUserEmit = 'update:modelValue' as string;

export default defineComponent({
  name: 'FormControlPriority',
  props: {
    modelValue: {
      type: String as PropType<PriorityTypes>,
      required: true,
    },
    priorities: {
      type: Array as PropType<PriorityTypes[]>,
      required: true,
    },
  },
  emits: [onSelectUserEmit],
  setup() {
    return {
      onSelectUserEmit,
    };
  },
});
</script>

<template>
  <JSelect
    :model-value="[modelValue]"
    :attach="false"
    :input="{ regular: true }"
    @update:modelValue="$emit(onSelectUserEmit, $event[0])"
  >
    <div
      v-for="(priority, index) in priorities"
      :key="index"
      :value="priority"
      class="priority-item"
    >
      <JIcon
        :icon="priority"
        container-size
        icon-wrapper
        size="18px"
        b-radius="0px"
      />
      <span class="ml-2">
        {{ priority }}
      </span>
    </div>

    <template #result>
      <JIcon
        :icon="modelValue"
        container-size
        icon-wrapper
        size="24px"
      />
      <span class="ml-2">
        {{ modelValue }}
      </span>
    </template>
  </JSelect>
</template>

<style lang="scss" scoped>
.priority-item {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
