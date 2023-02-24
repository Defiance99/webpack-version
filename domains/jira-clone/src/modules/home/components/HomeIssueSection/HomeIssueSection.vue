<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { PreviewIssue } from '@/interfaces/Issue.interface';
import ShortInfoIssue from '@/components/task/ShortInfoIssue';

export default defineComponent({
  name: 'HomeIssueSection',
  components: {
    ShortInfoIssue,
  },
  props: {
    workedon: {
      type: Object as unknown as PropType<PreviewIssue[]>,
      default: null,
    },
    toDo: {
      type: Object as unknown as PropType<PreviewIssue[]>,
      default: null,
    },
    viewed: {
      type: Object as unknown as PropType<PreviewIssue[]>,
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
          v-for="(issue, index) in workedon"
          :key="index"
          :preview-issue="issue"
          assigned-avatars
        />
      </JTabBodyItem>
      <JTabBodyItem>
        <h3 class="home-tab-body-title">
          Last weekly
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in viewed"
          :key="index"
          :preview-issue="issue"
          assigned-avatars
        />
      </JTabBodyItem>
      <JTabBodyItem>
        <h3 class="home-tab-body-title">
          Last weekly
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in toDo"
          :key="index"
          :preview-issue="issue"
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
