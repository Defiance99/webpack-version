<script lang='ts'>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'JIcon',
  components: {
    downArrow: defineAsyncComponent(() => import('@/icons/DownArrowIcon.vue')),
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
    page: defineAsyncComponent(() => import('@/icons/PageIcon.vue')),
    codeTag: defineAsyncComponent(() => import('@/icons/CodeIcon.vue')),
    highest: defineAsyncComponent(() => import('@/icons/HighestPriorityIcon.vue')),
    high: defineAsyncComponent(() => import('@/icons/HighPriorityIcon.vue')),
    medium: defineAsyncComponent(() => import('@/icons/MediumPriorityIcon.vue')),
    low: defineAsyncComponent(() => import('@/icons/LowPriorityIcon.vue')),
    lowest: defineAsyncComponent(() => import('@/icons/LowestPriorityIcon.vue')),
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
    iconWrapper: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '16px',
    },
    bRadius: {
      type: String,
      default: '4px',
    },
  },
};
</script>

<template>
  <div v-if="iconWrapper" class="j-icon-wrapper">
    <component
      :is="icon"
      aria-hidden="true"
      class="j-icon"
      :class="{'j-container-size': containerSize}"
    />
  </div>
  <component
    :is="icon"
    v-else
    aria-hidden="true"
    class="j-icon"
    :class="{'j-container-size': containerSize}"
  />
</template>

<style lang="scss" scoped>
.j-container-size {
  width: 100%;
  height: 100%;
}

.j-icon-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: v-bind(size);
  width: v-bind(size);
  border-radius: v-bind(bRadius);
  overflow: hidden;
}
</style>
