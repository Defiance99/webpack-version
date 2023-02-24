<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import { Project } from '@/interfaces/Project.interfcace';
import IssueType from '@/components/issue-parts/IssueType';
import AvatarsGroup from '@/components/group/AvatarsGroup';
import useIssueUtils from '@/composables/utils/useIssueUtils';

export default defineComponent({
  name: 'IssueCard',
  components: {
    IssueType,
    AvatarsGroup,
  },
  props: {
    issue: {
      type: Object as PropType<Issue>,
      required: true,
    },
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  setup(props) {
    const { issueAssignees } = useIssueUtils(props.project, props.issue);

    return {
      issueAssignees,
    };
  },
});
</script>

<template>
  <div class="issue-card">
    <div class="issue-card-grabber" />
    <p class="issue-card-title text-body-3">
      {{ issue.name }}
    </p>
    <div class="issue-card-info">
      <JIcon
        :icon="issue.type"
        icon-wrapper
        container-size
        size="18px"
        b-radius="0px"
      />
      <JIcon
        :icon="issue.priority"
        icon-wrapper
        container-size
        size="18px"
        b-radius="0px"
        class="ml-1"
      />
    </div>
    <div class="issue-card-info issue-card-info-bottom">
      <IssueType
        :issue-value="issue.key"
      />
      <AvatarsGroup
        size="xs"
        :users="issueAssignees"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.issue-card {
  position: relative;
  padding: 10px 10px 10px 13px;
  border-radius: 2px;
  box-shadow: #091e4240 0 1px 2px;
  cursor: grab;
  background-color: #fff;
  transition: background-color 100ms cubic-bezier(.4,0,.2,1), top 400ms, left 400ms;

  &:hover {
    background-color: #ebecf0;
  }
}

.issue-card-title {
  color: var(--j-text);
}

.issue-card-info {
  display: flex;
  align-items: center;
  margin-top: 10px;

  &.issue-card-info-bottom {
    justify-content: space-between;
  }

  .j-avatar {
    justify-content: flex-start;
  }

  .issue-type {
    :deep(.issue-number) {
      padding-left: 0;
    }
  }
}

.issue-card-grabber {
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 3px;
  height: auto;
  background-color: var(--j-primary-color);
}

.issue-type {
  ::v-deep(.issue-value) {
    padding-left: 0;
    white-space: nowrap;
  }
}
</style>
