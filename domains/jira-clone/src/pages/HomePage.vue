<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import { Issue, PreviewIssue } from '@/interfaces/Issue.interface';
import { TabsIssues } from '@/modules/home/interfaces/TabsIssues';
import HomeProjectsSection from '@/modules/home/components/HomeProjectsSection';
import HomeIssueSection from '@/modules/home/components/HomeIssueSection';
import useIssuesStore from '@/composables/store/useIssuesStore';
import useLoaderUtils from '@/composables/utils/useLoaderUtils';
import useIssueUtils from '@/composables/utils/useIssueUtils';
import useFetchIssues from '@/composables/api/useFetchIssues';

interface TabsIssuesIds {
  workedon: number[];
  toDo: number[];
  viewed: number[];
}

export default defineComponent({
  name: 'HomePage',
  components: {
    HomeProjectsSection,
    HomeIssueSection,
  },
  setup() {
    const { fetchTabsIssues } = useFetchIssues();
    const { isLoad, startLoad, stopLoad } = useLoaderUtils();
    const tabsIssuesIds = reactive<TabsIssuesIds>({
      workedon: [],
      toDo: [],
      viewed: [],
    });
    const { transformIssuesToIdsArray } = useIssueUtils();
    const { mergeIssues, getIssues } = useIssuesStore();

    const initTabsIssues = async () => {
      startLoad();
      const tabsIssuesRes: TabsIssues | null | undefined = await fetchTabsIssues();

      if (tabsIssuesRes) {
        tabsIssuesIds.workedon = transformIssuesToIdsArray(tabsIssuesRes.workedon);
        tabsIssuesIds.toDo = transformIssuesToIdsArray(tabsIssuesRes.toDo);
        tabsIssuesIds.viewed = transformIssuesToIdsArray(tabsIssuesRes.viewed);

        mergeIssues(tabsIssuesRes.workedon);
        mergeIssues(tabsIssuesRes.toDo);
        mergeIssues(tabsIssuesRes.viewed);
      }
      stopLoad();
    };

    initTabsIssues();

    const getTabsIssues = computed(() => {
      const newTabsIssuesIds: TabsIssues = {
        workedon: [],
        toDo: [],
        viewed: [],
      };

      if (tabsIssuesIds.workedon.length === 0 && tabsIssuesIds.toDo.length === 0 && tabsIssuesIds.viewed.length === 0) {
        return newTabsIssuesIds;
      }

      getIssues.value.forEach((issue: Issue | PreviewIssue) => {
        if ('isPreview' in issue === false) return;
        if (tabsIssuesIds.workedon.includes(issue.id)) newTabsIssuesIds.workedon.push(issue as PreviewIssue);
        if (tabsIssuesIds.toDo.includes(issue.id)) newTabsIssuesIds.toDo.push(issue as PreviewIssue);
        if (tabsIssuesIds.viewed.includes(issue.id)) newTabsIssuesIds.viewed.push(issue as PreviewIssue);
      });

      return newTabsIssuesIds;
    });

    return {
      isLoad,
      getTabsIssues,
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
    <HomeIssueSection
      :workedon="getTabsIssues.workedon"
      :toDo="getTabsIssues.toDo"
      :viewed="getTabsIssues.viewed"
      :loading="isLoad"
    />
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
