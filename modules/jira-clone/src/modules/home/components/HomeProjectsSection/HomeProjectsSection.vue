<script setup lang="ts">
import UserProjectCard from '@/components/card/UserProjectCard';
import UserProject from '@/interfaces/UserProject.interface';

const userProjects: UserProject = [
  {
    id: 1,
    name: 'Test project',
    totalTasks: 16,
    shortInfo: 'Software product',
  },
  {
    id: 1,
    name: 'Test project',
    totalTasks: 16,
    shortInfo: 'Software product',
  },
  {
    id: 1,
    name: 'Test project',
    totalTasks: 16,
    shortInfo: 'Software product',
  },
  {
    id: 1,
    name: 'Test project',
    totalTasks: 16,
    shortInfo: 'Software product',
  },
  {
    id: 1,
    name: 'Test project',
    totalTasks: 16,
    shortInfo: 'Software product',
  },
];
</script>

<template>
  <section>
    <h2 class="mb-4">
      Recent projects
    </h2>
    <div class="projects-list">
      <UserProjectCard
        v-for="(project, index) in userProjects"
        :key="index"
        :project="project"
      />
    </div>
  </section>
</template>

<style>
.projects-list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
}
</style>
