<script lang="ts">
/* eslint-disable max-len */
import { defineComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppLogo from '@/components/logo/AppLogo';
import AddIssueDialog from '@/components/dialog/AddIssueDialog';
import useUserStore from '@/composables/store/useUserStore';
import HeaderSearchTool from './HeaderSearchTool.vue';
import HeaderProjectsMenu from './HeaderProjectsMenu.vue';
import HeaderThemePickerTool from './HeaderThemePickerTool.vue';
import HeaderNotificationTool from './HeaderNotificationTool.vue';

const openSearchSidebarEmitName = 'toggle:search-sidebar';

export default defineComponent({
  name: 'TheHeader',
  components: {
    AppLogo,
    AddIssueDialog,
    HeaderSearchTool,
    HeaderProjectsMenu,
    HeaderNotificationTool,
    HeaderThemePickerTool,
  },
  emits: [openSearchSidebarEmitName],
  setup(_, { emit }) {
    const route = useRoute();
    const { getUser } = useUserStore();
    const projectsMenuModel = ref(false);
    const addIssueDialogModel = ref(false);

    // TODO: вынести установку дайлогов в отдельный компосабл!

    const currentPath = computed(() => route.path);

    const toggleSearchSidebar = (): void => {
      emit(openSearchSidebarEmitName);
    };

    const showIssueDialog = (): void => {
      addIssueDialogModel.value = true;
    };

    const showProjectsMenu = (): void => {
      projectsMenuModel.value = true;
    };

    return {
      getUser,
      currentPath,
      projectsMenuModel,
      showProjectsMenu,
      showIssueDialog,
      addIssueDialogModel,
      toggleSearchSidebar,
    };
  },
});
</script>

<template>
  <header class="sticky-header">
    <nav class="navigation-wrapper container">
      <router-link
        v-ripple
        to="/"
        class="j-hover-effect j-active-effect navigation-list-item"
        :class="{ active: currentPath === '/' }"
      >
        <AppLogo />
      </router-link>

      <ul class="navigation-list">
        <li class="text-body-3">
          <router-link
            v-ripple
            to="/about"
            class="j-hover-effect j-active-effect navigation-list-item"
          >
            <span class="navigation-list-label">About project</span>
          </router-link>
        </li>
        <li class="text-body-3">
          <JSemanticButton
            v-ripple
            class="j-hover-effect j-active-effect navigation-list-item"
          >
            <span class="navigation-list-label">Your work</span>
            <JArrowIcon />
          </JSemanticButton>
        </li>
        <li class="text-body-3">
          <JSemanticButton
            v-ripple
            class="j-hover-effect j-active-effect navigation-list-item"
            :class="{ active: currentPath === '/projects' || projectsMenuModel }"
            @click="showProjectsMenu"
          >
            <span class="navigation-list-label">Projects</span>
            <JArrowIcon />
          </JSemanticButton>

          <HeaderProjectsMenu
            v-model="projectsMenuModel"
          />
        </li>
      </ul>

      <JButton
        class="ml-3 create-button"
        type="stroked"
        @click="showIssueDialog"
      >
        Create
      </JButton>

      <HeaderSearchTool @click="toggleSearchSidebar" />

      <HeaderNotificationTool />

      <HeaderThemePickerTool />

      <JAvatar class="hover-effect cursor-pointer ml-2 user-avatar">
        <img
          :src="getUser?.image"
          alt=""
        >
      </JAvatar>
    </nav>
  </header>

  <AddIssueDialog v-model="addIssueDialogModel" />
</template>

<style lang="scss" scoped>
.sticky-header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 56px;
  box-shadow: 0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f;
  background-color: var(--j-primary-color);

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
}

.search-sidebar {
  margin-left: auto;
}

.navigation-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 32px;

  :deep(.tool-icon-wrapper) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    color: var(--j-primary-text-color);
    overflow: hidden;

    .select-theme-icon {
      width: 20px;
      height: 20px;
    }
  }
}

.navigation-list {
  display: flex;

  & > li {
    position: relative;
    margin: 0 4px;
  }
}

.navigation-list-item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 12px;
  height: 36px;
  color: var(--j-primary-text-color);
  border-radius: 4px;
  overflow: hidden;
}

.navigation-list-label {
  margin-right: 5px;
}

.navigation-list-item,
.navigation-list,
.create-button,
.tool-icon-wrapper,
.user-avatar {
  flex-shrink: 0;
}
</style>
