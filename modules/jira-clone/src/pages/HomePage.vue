<script lang="ts">
import { defineComponent, ref } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import HomeProjectsSection from '@/modules/home/components/HomeProjectsSection';
import HomeIssueSection from '@/modules/home/components/HomeIssueSection';

const issues: IssueInfo[] = [
  {
    id: 1,
    project: 1,
    name: 'Задача по устранению интеграции с банком',
    type: 'task',
    number: 'MP-104',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
  {
    id: 1,
    project: 1,
    name: 'При регистрации пользователя - передавать язык выбранный на сайте',
    type: 'story',
    number: 'MP-22',
  },
  {
    id: 1,
    project: 1,
    name: 'Отправлять письмо восстановление пароля на нужном языке',
    type: 'task',
    number: 'MP-521',
  },
  {
    id: 1,
    project: 1,
    name: 'Logout (High)',
    type: 'task',
    number: 'MP-35',
  },
  {
    id: 1,
    project: 1,
    name: 'Задача по устранению интеграции с банком',
    type: 'task',
    number: 'MP-104',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
  {
    id: 1,
    project: 1,
    name: 'Фоф дылвоа лдыоаылвфоаф',
    type: 'bug',
    number: 'MP-234',
  },
];

export default defineComponent({
  name: 'HomePage',
  components: {
    HomeProjectsSection,
    HomeIssueSection,
  },
  setup() {
    return { issues };
  },
});
</script>

<template>
  <JContainer class="pb-5 pt-5 about-page-container">
    <h1 class="text-subtitle-1">
      Your work
    </h1>
  </JContainer>
  <JContainer class="pt-5 home-page-content">
    <HomeProjectsSection class="mb-7" />
    <HomeIssueSection :issues="issues" />
  </JContainer>
</template>

<style scoped lang="scss">
.about-page-container {
  display: flex;
  align-items: center;
  min-height: 100px;
  background-color: var(--j-primary-color);
  color: var(--j-primary-text-color);
}

.home-page-content {
  background-color: var(--j-secondary-color);
}
</style>
