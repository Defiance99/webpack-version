<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import type { RecentIssues } from '@/modules/home/interfaces/RecentIssues';
import ShortInfoIssue from '@/components/task/ShortInfoIssue';

export default defineComponent({
  name: 'HomeIssueSection',
  components: {
    ShortInfoIssue,
  },
  props: {
    issues: {
      type: Object as PropType<RecentIssues>,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeTab = ref(0);

    return {
      activeTab,
    };
  },
});
</script>

<template>
  <section>
    <JTabsHeader v-model="activeTab">
      <JTabHeaderItem>Бывшие в работе</JTabHeaderItem>
      <JTabHeaderItem>Viewed</JTabHeaderItem>
      <JTabHeaderItem>For to do</JTabHeaderItem>
    </JTabsHeader>

    <JTabsBody
      v-if="loading === false"
      v-model="activeTab"
    >
      <JTabBodyItem>
        <h3 class="home-tab-body-title">
          Last monthly
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in issues.recentInProgress"
          :key="index"
          :issue="issue"
          assigned-avatars
        />
      </JTabBodyItem>
      <JTabBodyItem>
        <h3 class="home-tab-body-title">
          Last weekly
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in issues.viewed"
          :key="index"
          :issue="issue"
          assigned-avatars
        />
      </JTabBodyItem>
      <JTabBodyItem>
        <h3 class="home-tab-body-title">
          Last weekly
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in issues.toDo"
          :key="index"
          :issue="issue"
          assigned-avatars
        />
      </JTabBodyItem>
    </JTabsBody>

    <div v-else>
      <JSkeleton
        v-for="(_, index) in 6"
        :key="index"
        height="45px"
        width="100%"
        class="mt-1"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
}

.home-tab-body-title {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
