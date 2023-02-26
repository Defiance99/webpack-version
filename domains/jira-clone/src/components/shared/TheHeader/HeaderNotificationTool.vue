<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderNotificationTool',
});
</script>

<template>
  <JTooltip attach=".drawer-content-wrapper">
    <template #activator="slotProps">
      <JSemanticButton
        v-ripple
        v-bind="slotProps"
        aria-label="Button that shows a notifications menu"
        class="tool-icon-wrapper j-hover-effect rounded-md ml-2 disabled"
      >
        <JIcon
          icon="notification"
          contrainer-size
          class="tool-icon"
        />
      </JSemanticButton>
    </template>

    Notification
  </JTooltip>
</template>
