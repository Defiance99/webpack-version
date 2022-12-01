<script lang="ts">
import { defineComponent } from 'vue';
import useTheme from 'UI/utils/useTheme';

export default defineComponent({
  name: 'HeaderThemePickerTool',
  setup() {
    const { themeTypes, setTheme, getCurrentTheme } = useTheme();

    return {
      themeTypes,
      setTheme,
      getCurrentTheme,
    };
  },
});
</script>

<template>
  <JMenu>
    <template #activator="menuSlotProps">
      <JTooltip attach=".drawer-content-wrapper">
        <template #activator="tooltipSlotProps">
          <JSemanticButton
            v-ripple
            aria-label="Button that shows a theme picker menu"
            class="tool-icon-wrapper hover-effect rounded-md cursor-pointer ml-2"
            v-bind="{ ...tooltipSlotProps, ...menuSlotProps }"
          >
            <JIcon
              icon="themeColor"
              contrainer-size
              class="tool-icon select-theme-icon"
            />
          </JSemanticButton>
        </template>

        <span>Select color theme</span>
      </JTooltip>
    </template>
    <JList class="text-body-3 list-themes">
      <JListItem @click="setTheme(themeTypes.default)">
        <JIcon
          icon="purpleLightTheme"
          class="mr-3"
        />
        <span class="mr-4">Deep Purple & Light</span>
        <JIcon
          v-if="getCurrentTheme === themeTypes.default"
          icon="check"
          class="active-theme-icon"
        />
      </JListItem>
      <JListItem @click="setTheme(themeTypes.darkPurple)">
        <JIcon
          icon="purpleDarkTheme"
          class="mr-3"
        />
        <span>Purple & Dark (alpha)</span>
        <JIcon
          v-if="getCurrentTheme === themeTypes.darkPurple"
          icon="check"
          class="active-theme-icon"
        />
      </JListItem>
    </JList>
  </JMenu>
</template>

<style lang="scss" scoped>
.active-theme-icon {
  margin-left: auto;
  color: var(--j-primary-color);
}

.list-themes {
  min-width: 230px;
}
</style>
