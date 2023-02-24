<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderProjectsMenu',
});
</script>

<template>
  <JMenu :max-height="false">
    <div class="header-project-menu-title">
      Recently
    </div>
    <JList>
      <JListItem>123</JListItem>
      <JListItem>123</JListItem>
      <JListItem>123</JListItem>
    </JList>
    <JDivider />
    <JList>
      <JListItem>123</JListItem>
      <JListItem>123</JListItem>
      <JListItem>123</JListItem>
    </JList>
  </JMenu>
</template>

<style lang="scss" scoped>
.header-project-menu-title {
  margin-top: 14px;
  margin-bottom: 6px;
  padding: 0px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #5E6C84;
}
</style>
