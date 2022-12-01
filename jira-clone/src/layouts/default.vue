<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeader from '@/components/TheHeader';
import SearchByApp from '@/modules/search/components/SearchByApp';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    TheHeader,
    SearchByApp,
  },
  setup() {
    const showSidebar = ref<boolean>(false);

    const toggleSidebar = (): void => {
      showSidebar.value = !showSidebar.value;
    };

    return {
      showSidebar,
      toggleSidebar,
    };
  },
});
</script>

<template>
  <div class="layout-default">
    <TheHeader @toggle:search-sidebar="toggleSidebar" />
    <JDrawer
      v-model="showSidebar"
      class="drawer-content-wrapper"
      position="right"
    >
      <slot />

      <template #drawer>
        <SearchByApp />
      </template>
    </JDrawer>
  </div>
</template>

<style scoped lang="scss">
.layout-default {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.drawer-content-wrapper {
  position: relative;
  overflow-y: auto;

  :deep(.j-drawer-container) {
    max-width: 600px;
  }
}
</style>
