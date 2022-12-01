<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import type IssueInfo from '@/interfaces/IssueInfo.interface';
import ShortInfoIssue from '@/components/task/ShortInfoIssue';

export default defineComponent({
  name: 'HomeIssueSection',
  components: {
    ShortInfoIssue,
  },
  props: {
    issues: {
      type: Object as PropType<IssueInfo[]>,
      required: true,
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

    <JTabsBody v-model="activeTab">
      <JTabBodyItem>
        <h3 class="mt-3 mb-3">
          За последний месяц
        </h3>
        <ShortInfoIssue
          v-for="(issue, index) in issues"
          :key="index"
          :issue="issue"
          watchers-avatars
        />
      </JTabBodyItem>
      <JTabBodyItem>
        <h3>За последнюю неделю</h3>
      </JTabBodyItem>
      <JTabBodyItem>
        <h3>За последнюю неделю</h3>
      </JTabBodyItem>
    </JTabsBody>

    <h1>I AM EHRE HELLOY</h1>
  </section>
</template>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 12px;
}
</style>
