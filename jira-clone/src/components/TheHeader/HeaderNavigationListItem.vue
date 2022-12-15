<template>
  <div class="header-navigation-list-item">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.header-navigation-list-item {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  margin: 0 4px;
  padding: 0 12px;
  height: 36px;
  color: var(--j-primary-text-color);
  border-radius: 4px;
  overflow: hidden;
}
</style>
