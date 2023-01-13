<script setup lang="ts">
import { RouterView } from 'vue-router';
import useAuth from '@/composables/useAuth';
import useUserStore from '@/composables/store/useUserStore';
import useFetchProjects from '@/composables/useFetchProjects';
import useTheme from 'UI/utils/useTheme';

const { initTheme } = useTheme();
const { getUser } = useUserStore();
const { isAuth } = useAuth();
const { initProjects } = useFetchProjects();

if (isAuth.value && getUser.value) {
  initProjects(getUser.value.projects);
}

initTheme();
</script>

<template>
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>

  <JOverlayRoot />
</template>
