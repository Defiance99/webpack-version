<template>
  <WEditor msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    WEditor: defineAsyncComponent(
      () => import('../src/components/WEditor.vue')
    ),
  },
});
</script>
