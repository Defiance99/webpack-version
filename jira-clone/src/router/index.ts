import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DefaultLayout from '@/layouts/default.vue';
import ProjectLayout from '@/layouts/project.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: '/project/:project/issue/:issue',
    name: 'issue-page',
    component: () => import('@/pages/IssuePage.vue'),
    meta: {
      layout: ProjectLayout,
      breadcrumbs: [
        { name: 'Project' },
        { name: 'project', param: true },
        { name: 'Issue' },
        { name: 'issue', param: true },
      ],
    },
  },
  {
    path: '/project/:project/settings',
    name: 'project-settings',
    component: () => import('@/pages/ProjectSettings.vue'),
    meta: {
      layout: ProjectLayout,
      breadcrumbs: [
        { name: 'Project' },
        { name: 'project', param: true },
        { name: 'Settings' },
      ],
    },
  },
  {
    path: '/project/:project/board',
    name: 'project-board',
    component: () => import('@/pages/ProjectBoard.vue'),
    meta: {
      layout: ProjectLayout,
      breadcrumbs: [
        { name: 'Project' },
        { name: 'project', param: true },
        { name: 'Board' },
      ],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
