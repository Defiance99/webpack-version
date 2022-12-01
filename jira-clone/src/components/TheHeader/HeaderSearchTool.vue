<script lang="ts">
import { defineComponent } from 'vue';

const clickEmitName = 'click';

export default defineComponent({
  name: 'HeaderSearchTool',
  emits: [clickEmitName],
  setup() {
    return {
      clickEmitName,
    };
  },
});
</script>

<template>
  <JTooltip attach=".drawer-content-wrapper">
    <template #activator="slotProps">
      <JSemanticButton
        v-ripple
        v-bind="slotProps"
        aria-label="Button that shows a search drawer"
        class="tool-icon-wrapper hover-effect rounded-md cursor-pointer ml-auto"
        @click="$emit(clickEmitName)"
      >
        <JIcon
          icon="search"
          contrainer-size
          class="tool-icon"
        />
      </JSemanticButton>
    </template>

    Search
  </JTooltip>
</template>
