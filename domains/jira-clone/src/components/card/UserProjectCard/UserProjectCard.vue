<script lang="ts">
import { PropType, defineComponent } from 'vue';
import type { Project } from '@/interfaces/Project.interfcace';

export default defineComponent({
  name: 'UserProjectCard',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
});
</script>

<template>
  <router-link :to="`/project/${project.id}/board`" class="user-project-card">
    <div>
      <div class="project-name-block mb-3">
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
          {{ project.description }}
        </p>
      </div>
      <p class="title-links-block text-body-5 mb-1">
        Short links
      </p>
      <a class="link-block">
        <p class="link-name text-body-5">
          Total tasks
        </p>
        <JChip>
          <span class="text-body-6">{{ project.totalIssues }}</span>
        </JChip>
      </a>
      <a class="link-block">
        <p class="link-name text-body-5">
          Complete task
        </p>
        <JChip>
          <span class="text-body-6">{{ project.totalCompleteIssues }}</span>
        </JChip>
      </a>
    </div>
  </router-link>
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

    .project-name {
      text-decoration: underline;
    }
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
