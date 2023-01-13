<script lang="ts">
import { defineProps } from 'vue';

export default {
  name: 'JChip',
};
</script>

<script setup lang="ts">
const props = defineProps({
  background: {
    type: String,
    default: '#ddd',
  },
  size: {
    type: String,
    default: 's',
    validator(value: string): boolean {
      return ['custom', 'm', 's', 'xs', 'xxs'].includes(value);
    },
  },
  radius: {
    type: String,
    default: 'xs',
    validator(value: string): boolean {
      return ['custom', 'm', 's', 'xs', 'xxs'].includes(value);
    },
  },
});
</script>

<template>
  <div
    class="j-chip"
    :class="[`size-${props.size}`, `rounded-${props.radius}`]"
  >
    <slot />
  </div>
</template>

<style scoped>
.j-chip {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  background: v-bind(background);
}

.size-s {
  padding: 2px 8px;
  max-width: max-content;
  max-height: max-content;
}
</style>
