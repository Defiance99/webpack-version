<script setup lang="ts">
import { PropType, defineProps } from 'vue';
import type UserProject from '@/interfaces/UserProject.interface';

defineProps({
  project: {
    type: Object as PropType<UserProject>,
    required: true,
  },
});
</script>

<template>
  <div class="user-project-card">
    <div>
      <a class="project-name-block mb-3">
        <span class="project-icon-wrapper">
          <JIcon
            icon="projectWallet"
            container-size
          />
        </span>
        <p class="project-name text-ellipsis text-subtitle-4">
          {{ project.name }}
        </p>
        <p class="text-body-5 text-ellipsis">
          {{ project.shortInfo }}
        </p>
      </a>
      <p class="title-links-block text-body-5 mb-1">
        Short links
      </p>
      <a class="link-block j-hover-effect j-active-effect">
        <p class="link-name text-body-5">
          Total tasks
        </p>
        <JChip>
          <span class="text-body-6">{{ project.totalTasks }}</span>
        </JChip>
      </a>
      <a
        class="link-block j-hover-effect j-active-effect"
      >
        <p class="link-name text-body-5">
          My tasks
        </p>
        <JChip>
          <span class="text-body-6">{{ project.totalTasks }}</span>
        </JChip>
      </a>
      <a class="link-block j-hover-effect j-active-effect">
        <p class="link-name text-body-5">
          Complete task
        </p>
        <JChip>
          <span class="text-body-6">{{ project.totalTasks }}</span>
        </JChip>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-project-card {
  position: relative;
  padding: 10px 10px 10px 16px;
  width: 244px;
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.4);
  border-left: 20px solid #FFE380;
  border-radius: 3px;
  background: #fff;
  transition: 120ms;

  &:hover {
    box-shadow: 0 1px 5px rgba(9, 30, 66, 0.4);
  }
}

.link-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 4px;
  cursor: pointer;
  border-radius: 3px;
}

.project-name-block {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    .project-name {
      text-decoration: underline;
    }
  }
}

.title-links-block {
  color: #6B778C;
  text-transform: uppercase;
  padding: 0 4px;
}

.project-icon-wrapper {
  display: flex;
  position: absolute;
  top: 7px;
  left: -28px;
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 3px;
}
</style>
