<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RecentIssues } from '@/modules/home/interfaces/RecentIssues';
import useFetchRecentIssues from '@/modules/home/composables/useFetchRecentIssues';
import HomeProjectsSection from '@/modules/home/components/HomeProjectsSection';
import HomeIssueSection from '@/modules/home/components/HomeIssueSection';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useLoaderUtils from '@/composables/useLoaderUtils';

export default defineComponent({
  name: 'HomePage',
  components: {
    HomeProjectsSection,
    HomeIssueSection,
  },
  setup() {
    const { fetchRecentIssues } = useFetchRecentIssues();
    const { mergeIssues } = useIssuesStore();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    // TODO: add optimization, remove ref
    const recentIssues = ref<RecentIssues>();

    const initRecentIssues = async () => {
      startLoad();
      const issues: RecentIssues | null | undefined = await fetchRecentIssues();

      if (issues) {
        recentIssues.value = issues;

        mergeIssues(recentIssues.value.recentInProgress);
        mergeIssues(recentIssues.value.toDo);
        mergeIssues(recentIssues.value.viewed);
      }
      stopLoad();
    };

    initRecentIssues();

    return {
      isLoad,
      recentIssues,
    };
  },
});
</script>

<template>
  <JContainer class="pb-5 pt-5 about-page-container">
    <h1 class="text-subtitle-1">Your work</h1>
  </JContainer>
  <JContainer class="pt-5 home-page-content">
    <HomeProjectsSection class="mb-7" />
    <HomeIssueSection :issues="recentIssues" :loading="isLoad" />
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
