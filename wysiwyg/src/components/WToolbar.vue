<script setup lang="ts">
import { defineProps, computed, Component, inject } from 'vue';
import ModuleInterface from '@/interfaces/Module.interface';
import Modules from '@/modules';

import WButton from '@/components/WButton.vue';

const props = defineProps({
  modules: {
    type: Array,
    required: true,
  },
});

const currentModules = computed(() =>
  Modules.filter(
    (module: ModuleInterface | Component) =>
      module.name && props.modules?.includes(module.name)
  )
);

const execute: any = inject('exec');

const onToolClick = (action: string): void => {
  execute(action);
};
</script>

<template>
  <div class="w-editor-toolbar">
    <WButton
      v-for="(module, index) in currentModules"
      v-once
      :key="`${module.name}-${index}`"
      :title="module.description"
      :class="`w-button-${module.description.toLowerCase()}`"
      @click="onToolClick(module.action)"
    >
      <component :is="module" />
    </WButton>
  </div>
</template>

<style lang="scss" scoped>
.w-editor-toolbar {
  padding: 8px;
  border-radius: 4px 4px 0 0;
  border: 1px solid #dfe1e6;
  border-bottom: none;
}

.w-button {
  &:nth-child(n + 2) {
    margin-left: 6px;
  }
}
</style>
