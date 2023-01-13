<script lang="ts">
import { defineComponent } from 'vue';
import useProjectsStore from '@/composables/store/useProjectsStore';
import UserProjectCard from '@/components/card/UserProjectCard';

export default defineComponent({
  name: 'HomeProjectsSection',
  components: {
    UserProjectCard,
  },
  setup() {
    const { getProjects } = useProjectsStore();

    return {
      getProjects,
    };
  },
});
</script>

<template>
  <section>
    <h2 class="mb-4">
      Recent projects
    </h2>
    <div v-if="getProjects" class="projects-list">
      <UserProjectCard
        v-for="(project, index) in getProjects"
        :key="index"
        :project="project"
      />
    </div>
    <div
      v-else
      class="skeleton-projects-list"
    >
      <JSkeleton
        v-for="(_, index) in 6"
        :key="index"
        height="134px"
        width="100%"
        class="skeleton-projects-list-item"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.projects-list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
}

.skeleton-projects-list {
  display: flex;
  flex-wrap: wrap;
}

.skeleton-projects-list-item {
  margin-right: 8px;
  margin-bottom: 8px;
  max-width: 244px;
}
</style>
