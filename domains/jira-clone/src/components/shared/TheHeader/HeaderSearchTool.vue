<script lang="ts">
import { defineComponent } from 'vue';

const clickEmitName = 'click';

export default defineComponent({
  name: 'HeaderSearchTool',
  emits: [clickEmitName as string],
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
        class="tool-icon-wrapper j-hover-effect rounded-md cursor-pointer ml-auto"
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
