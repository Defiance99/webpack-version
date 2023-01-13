<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Project } from '@/interfaces/Project.interfcace';
import { Issue } from '@/interfaces/Issue.interface';
import AvatarsGroup from '@/components/group/AvatarsGroup';
import IssueDetails from '@/components/shared/IssueDetails';
import useIssueUtils from '@/composables/useIssueUtils';
import useProjectsStore from '@/composables/store/useProjectsStore';

export default defineComponent({
  name: 'ShortInfoIssue',
  components: {
    AvatarsGroup,
    IssueDetails,
  },
  props: {
    issue: {
      type: Object as PropType<Issue>,
      required: true,
    },
    assignedAvatars: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { getProjectByKey } = useProjectsStore();
    const project = getProjectByKey(props.issue.project) as Project;
    const { issueAssignees } = useIssueUtils(project, props.issue);
    const issueDialogModel = ref<boolean>(false);

    const setDialogModel = (model: boolean): void => {
      issueDialogModel.value = model;
    };

    return {
      project,
      issueDialogModel,
      setDialogModel,
      issueAssignees,
    };
  },
});
</script>

<template>
  <JDialog
    v-if="issue.deleted !== true"
    v-model="issueDialogModel"
  >
    <template #activator="slotProps">
      <JListItem
        v-ripple
        v-bind="slotProps"
        tabindex="0"
        v-if="issue"
        class="short-issue-item mb-2"
      >
        <JIcon
          :icon="issue.type"
          container-size
          icon-wrapper
          size="20px"
          b-radius="0px"
        />
        <div class="issue-info ml-4">
          <span class="issue-name">
            {{ issue.name }}
          </span>
          <span>
            <span class="issue-key">
              {{ issue.key }}
            </span>
            <span class="issue-label text-body-4 ml-2">
              {{ issue.project }}
            </span>
          </span>
        </div>

        <div
          v-if="assignedAvatars"
          class="avatar-group-wrapper"
        >
          <AvatarsGroup :users="issueAssignees" />
        </div>
      </JListItem>
    </template>

    <IssueDetails
      :issue="issue"
      :project="project"
      @close="setDialogModel(false)"
    />
  </JDialog>
</template>

<style lang="scss" scoped>
.short-issue-item {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  color: rgb(66 82 110);
  cursor: pointer;
}

.issue-info {
  display: flex;
  flex-direction: column;
  line-height: 16px;
}

.issue-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--j-text-subtitle);
}

.avatar-group-wrapper {
  margin-left: auto;
}

.issue-key, .issue-label {
  font-size: 12px;
  color: var(--j-text-subtitle);
}

.j-icon-wrapper {
  flex-shrink: 0;
}
</style>
