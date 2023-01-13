<script lang="ts">
/* eslint-disable max-len */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProjectSidebar',
  setup() {
    const sidebarWrapperRef = ref<HTMLDivElement | null>(null);
    const isDefaultSidebar = ref(true);
    const minWidth = 56;
    const defaultWidth = 286;

    const iconsConfig = {
      containerSize: true,
      iconWrapper: true,
      size: '24px',
      bRadius: '0px',
    };

    const setIconSidebar = (): void => {
      if (sidebarWrapperRef.value === null) return;

      sidebarWrapperRef.value.style.paddingLeft = '0';
      sidebarWrapperRef.value.style.paddingRight = '0';
      sidebarWrapperRef.value.style.width = `${minWidth}px`;
      isDefaultSidebar.value = false;
    };

    const setDefaultSidebar = (): void => {
      if (sidebarWrapperRef.value === null) return;

      sidebarWrapperRef.value.style.paddingLeft = '';
      sidebarWrapperRef.value.style.paddingRight = '';
      isDefaultSidebar.value = true;
    };

    const setSidebarWidthCssVariable = (width: number): void => {
      document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
    };

    const setDefaultSidebarWidth = (): void => {
      if (sidebarWrapperRef.value) {
        sidebarWrapperRef.value.style.width = `${defaultWidth}px`;
      }
    };

    const setSidebarWidth = (width: number): void => {
      const maxWidth = window.innerWidth / 2;

      if (width > maxWidth || sidebarWrapperRef.value === null) return;

      if (width > minWidth) {
        sidebarWrapperRef.value.style.width = `${width}px`;
      }

      if (width <= minWidth) {
        setIconSidebar();
        setSidebarWidthCssVariable(minWidth);
      } else if (isDefaultSidebar.value === false) {
        setDefaultSidebar();
        setSidebarWidthCssVariable(defaultWidth);
      } else {
        setSidebarWidthCssVariable(width);
      }
    };

    const addTransitionWidth = (): void => {
      if (sidebarWrapperRef.value) {
        sidebarWrapperRef.value.style.transition = '400ms';
      }
    };

    const removeTransitionWidth = (): void => {
      if (sidebarWrapperRef.value) {
        sidebarWrapperRef.value.style.transition = '';
        sidebarWrapperRef.value.removeEventListener('transitionend', removeTransitionWidth);
      }
    };

    const toggleSidebarType = (): void => {
      addTransitionWidth();

      if (isDefaultSidebar.value) {
        setIconSidebar();
        setSidebarWidthCssVariable(minWidth);
      } else {
        setDefaultSidebar();
        setDefaultSidebarWidth();
        setSidebarWidthCssVariable(defaultWidth);
      }

      sidebarWrapperRef.value?.addEventListener('transitionend', removeTransitionWidth);
    };

    setSidebarWidthCssVariable(defaultWidth);

    return {
      iconsConfig,
      sidebarWrapperRef,
      isDefaultSidebar,
      setSidebarWidth,
      toggleSidebarType,
    };
  },
});
</script>

<template>
  <div class="app-sidebar-container">
    <div
      ref="sidebarWrapperRef"
      class="app-sidebar-wrapper"
    >
      <nav class="app-sidebar">
        <div class="project-header">
          <JIcon
            v-bind="iconsConfig"
            icon="projectWallet"
            b-radius="3px"
          />
          <div class="project-info">
            <span class="project-info-name"> Angular Jira Clone </span>
            <span class="project-info-subtitle text-body-3"> Software Project </span>
          </div>
        </div>
        <JList>
          <router-link :to="`/project/1/board`">
            <JListItem>
              <JIcon
                v-bind="iconsConfig"
                icon="board"
              />
              <span class="list-item-label"> Project Board </span>
            </JListItem>
          </router-link>
          <router-link :to="`/project/1/settings`">
            <JListItem>
              <JIcon
                v-bind="iconsConfig"
                icon="settings"
              />
              <span class="list-item-label">
                Project Settings
              </span>
            </JListItem>
          </router-link>
        </JList>

        <JDivider />

        <JList>
          <JListItem :disabled="true">
            <JIcon
              v-bind="iconsConfig"
              icon="backlog"
            />
            <span class="list-item-label"> Backlog </span>
          </JListItem>
          <JListItem :disabled="true">
            <JIcon
              v-bind="iconsConfig"
              icon="page"
            />
            <span class="list-item-label"> Pages </span>
          </JListItem>
          <JListItem :disabled="true">
            <JIcon
              v-bind="iconsConfig"
              icon="reports"
            />
            <span class="list-item-label"> Reports </span>
          </JListItem>
          <JListItem :disabled="true">
            <JIcon
              v-bind="iconsConfig"
              icon="codeTag"
            />
            <span class="list-item-label"> Code </span>
          </JListItem>
        </JList>
      </nav>
    </div>

    <JResizer
      :min-resize="!isDefaultSidebar"
      @click="toggleSidebarType"
      @resize="setSidebarWidth"
    />
  </div>
</template>

<style lang="scss" scoped>
$sidebar-width: 250px;

.app-sidebar-container {
  position: relative;
}

.app-sidebar-wrapper {
  position: relative;
  padding: 12px 18px;
  width: calc($sidebar-width + 18px * 2);
  max-width: 50vw;
  height: 100%;
  background: var(--j-border-color);
  overflow-x: hidden;;
  overflow-y: auto;
}

.app-sidebar {
  min-width: $sidebar-width;
  width: 100%;
}

.project-header {
  display: flex;
  align-items: center;
  margin: 12px 0;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--j-border-color);
}

.project-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
  line-height: 18px;
}

.project-info-name {
  font-weight: 600;
  color: var(--j-text-subtitle);
}

.project-info-subtitle {
  color: #5e6c84;
}

.list-item-label {
  margin-left: 16px;
}

.j-list {
  .router-link-active {
    .j-list-item {
      color: var(--j-primary-color);
    }
  }
}

.j-list-item {
  color: var(--j-text-subtitle);
  background: var(--j-border-color);
}
</style>
