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
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
