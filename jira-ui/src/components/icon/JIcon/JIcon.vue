<script lang='ts'>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'JIcon',
  components: {
    down: defineAsyncComponent(() => import('@/icons/DownArrowIcon.vue')),
    search: defineAsyncComponent(() => import('@/icons/SearchIcon.vue')),
    notification: defineAsyncComponent(() => import('@/icons/NotificationIcon.vue')),
    bug: defineAsyncComponent(() => import('@/icons/BugIcon.vue')),
    task: defineAsyncComponent(() => import('@/icons/TaskIcon.vue')),
    story: defineAsyncComponent(() => import('@/icons/StoryIcon.vue')),
    projectWallet: defineAsyncComponent(() => import('@/icons/ProjectIconWallet.vue')),
    themeColor: defineAsyncComponent(() => import('@/icons/ThemeColor.vue')),
    close: defineAsyncComponent(() => import('@/icons/CloseIcon.vue')),
    searchResultNotFound: defineAsyncComponent(() => import('@/icons/SearchNotFoundIcon.vue')),
    purpleLightTheme: defineAsyncComponent(() => import('@/icons/PurpleLightThemeIcon.vue')),
    purpleDarkTheme: defineAsyncComponent(() => import('@/icons/PurpleDarkThemeIcon.vue')),
    radio: defineAsyncComponent(() => import('@/icons/RadioIcon.vue')),
    activeRadio: defineAsyncComponent(() => import('@/icons/ActiveRadioIcon.vue')),
    check: defineAsyncComponent(() => import('@/icons/CheckIcon.vue')),
    trash: defineAsyncComponent(() => import('@/icons/TrashIcon.vue')),
    expand: defineAsyncComponent(() => import('@/icons/ExpandIcon.vue')),
    checkbox: defineAsyncComponent(() => import('@/icons/CheckboxIcon.vue')),
    activeCheckbox: defineAsyncComponent(() => import('@/icons/ActiveCheckboxIcon.vue')),
    board: defineAsyncComponent(() => import('@/icons/BoardIcon.vue')),
    settings: defineAsyncComponent(() => import('@/icons/SettingsIcon.vue')),
    backlog: defineAsyncComponent(() => import('@/icons/BacklogIcon.vue')),
    reports: defineAsyncComponent(() => import('@/icons/ReportsIcon.vue')),
    code: defineAsyncComponent(() => import('@/icons/PageIcon.vue')),
    page: defineAsyncComponent(() => import('@/icons/CodeIcon.vue')),
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    containerSize: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
  <component
    :is="icon"
    aria-hidden="true"
    class="j-icon"
    :class="{'container-size': containerSize}"
  />
</template>

<style lang="scss" scoped>
.container-size {
  width: 100%;
  height: 100%;
}
</style>
