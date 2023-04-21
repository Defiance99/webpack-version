<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Issue } from '@/interfaces/Issue.interface';
import { Project } from '@/interfaces/Project.interfcace';
import FormControlUsersSelect from '@/components/form/FormControlUsersSelect';
import FormControlPriority from '@/components/form/FormControlPriority';

const updateStatusEmit = 'update:status' as string;
const updateReporterEmit = 'update:reporter' as string;
const updateAssigneeEmit = 'update:assignee' as string;
const updatePriorityEmit = 'update:priority' as string;

export default defineComponent({
  name: 'IssueDetailsInfo',
  components: {
    FormControlUsersSelect,
    FormControlPriority,
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
  emits: [
    updateStatusEmit,
    updateReporterEmit,
    updateAssigneeEmit,
    updatePriorityEmit,
  ],
  setup() {
    return {
      updateStatusEmit,
      updateReporterEmit,
      updateAssigneeEmit,
      updatePriorityEmit,
    };
  },
});
</script>

<template>
  <div class="issue-details-group">
    <span class="issue-label"> Status </span>
    <div class="mb-5">
      <JSelect
        :modelValue="[issue.status]"
        :input="{ regular: true }"
        chips
        @update:modelValue="$emit(updateStatusEmit, $event[0])"
      >
        <JOption
          v-for="(status, index) in project.statuses"
          :key="index"
          :value="status"
          type="radio"
        >
          <span class="select-item-label issue-status">
            {{ status }}
          </span>
        </JOption>
      </JSelect>
    </div>

    <span class="issue-label"> Reporter </span>
    <div class="mb-5">
      <FormControlUsersSelect
        :project="project"
        :selectedUsersIds="issue.reporters"
        @select="$emit(updateReporterEmit, $event)"
      />
    </div>

    <span class="issue-label"> Assignees </span>
    <div class="mb-5">
      <FormControlUsersSelect
        :project="project"
        :selectedUsersIds="issue.assignees"
        @select="$emit(updateAssigneeEmit, $event)"
      />
    </div>

    <span class="issue-label"> Priority </span>
    <div class="mb-6">
      <FormControlPriority
        :model-value="issue.priority"
        :priorities="project.priorities"
        @update:modelValue="$emit(updatePriorityEmit, $event)"
      />
    </div>

    <p class="issue-date-create">
      Created - {{ issue.created }}
      <br>
      Updated - {{ issue.updated }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.issue-details-group {
  position: relative;
  max-width: 300px;
  width: 100%;
}

.issue-label {
  color: var(--j-text-subtitle);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.issue-date-create {
  font-size: 12px;
  color: var(--j-text-subtitle);
}
</style>
