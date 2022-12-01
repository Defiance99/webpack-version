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
        class="tool-icon-wrapper hover-effect rounded-md cursor-pointer ml-2"
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
